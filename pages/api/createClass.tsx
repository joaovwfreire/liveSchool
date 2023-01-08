import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'
import ethers from 'ethers';
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";
require('dotenv').config

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const className = req.body.class_name;
  const course = req.body.course;
  const description = req.body.description;
  const teacher = req.body.teacher_wallet;
  const link = req.body.link;
 
  
  const upsertDatabase = async () => {
    const client = await clientPromise;
    const db = client.db("liveschool");
   
    const findCourse = await db
        .collection('courses')
        .findOne({name: course,  teacher: teacher})
   
    if (findCourse == null){
        return ('Course not found');
    }
    const upsertAction = await db
        .collection("classes")
        .updateOne(
            {   name: className,  teacher: teacher, streamLink: link },
            {  
              $setOnInsert: { name: className, course: course, teacher: teacher, streamLink: link, description: description }
            },
            { upsert: true }
            );
        
    return ('Class created');
  }

  if (req.method === "POST" && className && description && teacher && link) {
    
    try {

        const response = await upsertDatabase();
       
        const wallet = new Wallet(process.env.NOTIFIER_PRIVATE_KEY);
       
        // Create the client with a `Signer` from your application
const xmtp = await Client.create(wallet)
// Start a scoped conversation with ID mydomain.xyz/bar. And add some metadata

const conversation2 = await xmtp.conversations.newConversation(
    teacher.toString(),
    {
      conversationId: "liveSchool",
      metadata: {
        title: "class1",
      },
    }
  )

  await conversation2.send(`New livestream for ${course}`)
  
      await conversation2.send(`Watch ${className} at ${link}`)
   

        res.status(200).json(response);
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
