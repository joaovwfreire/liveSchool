import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(1)
  const className = req.body.class_name;
  const course = req.body.course;
  const description = req.body.description;
  const teacher = req.body.teacher_wallet;
  const video = req.body.video_link;
console.log(req.body)
  

  if (req.method === "POST" && className && description && teacher && video && course) {
    console.log(1)
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
console.log(2)
        const response = await upsertDatabase();
       console.log(response)
        res.status(200).json(response);
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
