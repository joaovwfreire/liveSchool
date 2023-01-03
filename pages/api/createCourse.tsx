import { randomInt } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";

let uri = "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const course = req.body.course;
  const description = req.body.description;
  const amount = req.body.amount;
  const teacher = req.body.teacher_wallet;
  const url = req.body.url;

  
  const nextTokenId = randomInt(10000000);
  const upsertDatabase = async () => {
    const client = await clientPromise;
    const db = client.db("liveschool");
      console.log(12312)
    const upsertAction = await db
        .collection("courses")
        .updateOne(
            {  name: course,  teacher: teacher },
            {  // $set: { challengeId: 1, gameId: gameId, status: "started"},
              $setOnInsert: { contractAddress: process.env.ERC_1155_CONTRACT_ADDRESS, nftId: nextTokenId, name: course, description: description, ipfs: uri, teacher: teacher }
            },
            { upsert: true }
            );
  }

  console.log(12313132)

  if (req.method === "POST" && course && description && amount && teacher && url && nextTokenId) {
    console.log(144442)
    try {
      
      const optionsForUriGen = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: '84432712-3693-4aa2-99ac-aaa729f91982'
        },
        body: JSON.stringify({name: course, description: description, file_url: url})
      };
      
      await fetch('https://api.nftport.xyz/v0/metadata', optionsForUriGen)
        .then(response => response.json())
        .then(response => uri = response.metadata_uri)
        .catch(err => console.error(err));
       console.log(1)
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: `${process.env.NFT_PORT_KEY}`
            },
            body: JSON.stringify({
              tokens: [
                {
                  mint_to_address: teacher,
                  token_id: nextTokenId,
                  metadata_uri: uri,
                  quantity: amount
                }
              ],
              chain: 'polygon',
              contract_address: process.env.ERC_1155_CONTRACT_ADDRESS
            })
          };
          console.log(2)
          await fetch('https://api.nftport.xyz/v0/mints/customizable/batch', options)
            .then(response => { 
                upsertDatabase();
                res.status(200).json("Course creation succesfull! " + nextTokenId + " corresponds to this course's NFT id and can be seen at OpenSea." )
                
            })
            .catch(err => res.status(400).json(err));
            
        console.log(3 )
        res.status(200).json("Course creation succesfull! " + nextTokenId + " corresponds to this course's NFT id and can be seen at OpenSea." )
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
