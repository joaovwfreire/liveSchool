import { randomInt } from "crypto";
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
  const startDate = req.body.start;

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
            {   name: className,  teacher: teacher, start: startDate },
            {  // $set: { challengeId: 1, gameId: gameId, status: "started"},
              $setOnInsert: { name: className, teacher: teacher, start: startDate, description: description }
            },
            { upsert: true }
            );
        
    return ('Class created');
  }

  if (req.method === "POST" && className && description && teacher && startDate) {
    
    try {

        const response = await upsertDatabase();
       
        res.status(200).json(response);
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
