import { randomInt } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";
require ('dotenv').config()

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

  

  if (req.method === "POST" && course && description && amount && teacher && url && nextTokenId) {
    
    try {
      
      const optionsForUriGen = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: process.env.NFT_PORT_KEY
        },
        body: JSON.stringify({name: course, description: description, file_url: url})
      };
      
      await fetch('https://api.nftport.xyz/v0/metadata', optionsForUriGen)
        .then(response => response.json())
        .then(response => uri = response.metadata_uri)
        .catch(err => console.error(err));
      
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
                
            })
            .catch(err => res.status(400).json(err));
            
            
          try{  upsertDatabase();
          }catch(e){
   
            res.status(400).json(e);
          }
        res.status(200).json("Course creation succesfull! " + nextTokenId + " corresponds to this course's NFT id and can be seen at OpenSea." )
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
