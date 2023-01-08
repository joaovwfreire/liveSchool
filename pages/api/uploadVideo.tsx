import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const className = req.body.class_name;
  const course = req.body.course;
  const description = req.body.description;
  const teacher = req.body.teacher_wallet;
  const video = req.body.video_link;

  

  if (req.method === "POST" && className && description && teacher && video && course) {

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
          .collection("uploads")
          .updateOne(
              {   name: className, course: course,  teacher: teacher, video: video },
              {  // $set: { challengeId: 1, gameId: gameId, status: "started"},
                $setOnInsert: { name: className, teacher: teacher, course: course, video: video, description: description }
              },
              { upsert: true }
              );
          
      return ('Video upload succesfull!');
    }
    try {
        const response = await upsertDatabase();

        const wallet = new Wallet(process.env.NOTIFIER_PRIVATE_KEY);
        // Create the client with a `Signer` from your application
const xmtp = await Client.create(wallet)
// Start a scoped conversation with ID mydomain.xyz/bar. And add some metadata
const conversation2 = await xmtp.conversations.newConversation(
    teacher,
    {
      conversationId: `liveSchool/${course}`,
      metadata: {
        title: className,
      },
    }
  )
  await conversation2.send(`New upload for ${course}`)
      await conversation2.send(`Watch ${className}:`)
      await conversation2.send(`${video}`)
      
        res.status(200).json(response);
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
