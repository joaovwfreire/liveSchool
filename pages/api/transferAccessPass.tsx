import { _toEscapedUtf8String } from "ethers/lib/utils.js";
import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../server/mongo/middleware/mongodb";

require ('dotenv').config()




export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  
  const course = req.body.course;
  const nftId = req.body.nft_id;
  const receiverAddress = req.body.receiver;

  const upsertDatabase = async () => {
    const client = await clientPromise;
    const db = client.db("liveschool");
      
    const upsertAction = await db
        .collection("passes")
        .updateOne(
            {  name: course,  owner: receiverAddress, nftId: nftId },
            {  // $set: { challengeId: 1, gameId: gameId, status: "started"},
              $setOnInsert: { contractAddress: process.env.ERC_1155_CONTRACT_ADDRESS, nftId: nftId, course: course,  owner: receiverAddress}
            },
            { upsert: true }
            );
  }

  

  if (req.method === "POST" && course && nftId && receiverAddress) {
    
    try {
      
            upsertDatabase();
        res.status(200).json(`Access pass succesfully processed at database` )
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
