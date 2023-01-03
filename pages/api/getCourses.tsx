import { randomInt } from "crypto";
import { BaseContract, BigNumber, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";
import abi from '../../abi/token.json';


const getResponse = async() => {
    const client = await clientPromise;
    const db = client.db("liveschool");
    let resArray: any = [];
    let i = 1;

    var myCursor = await db.collection("courses").find();
    while(i != 0){
        var document = await myCursor.hasNext() ? await myCursor.next() : i--;
        if(document != 1){
            resArray.push(document)
          }
    }
    return resArray;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if (req.method === "GET") {
        
    try {
        const response = await getResponse();
        
        res.status(200).json(response) 
    } catch (e) {
    
        res.status(400).json(e);
    }
    }
}
    