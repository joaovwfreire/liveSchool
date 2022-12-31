import { randomInt } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const course = req.body.course;
  const description = req.body.description;
  const amount = req.body.amount;
  const teacher = req.body.teacher_wallet;
  const uri = req.body.uri;

  
  const nextTokenId = randomInt(10000000);
  const upsertDatabase = async () => {
    const client = await clientPromise;
    const db = client.db("liveschool");
      
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

  if (req.method === "POST" && course && description && amount && teacher && uri && nextTokenId) {
    
    try {
       
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
          
          await fetch('https://api.nftport.xyz/v0/mints/customizable/batch', options)
            .then(response => {
                upsertDatabase();
                res.status(200).json({response, id: nextTokenId})
                
            })
            .catch(err => res.status(400).json(err));
            
        
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
