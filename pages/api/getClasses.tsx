import { randomInt } from "crypto";
import { BaseContract, BigNumber, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";
import abi from '../../abi/token.json';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const course = req.query.course;
    if (req.method === "GET") {
    console.log({course})
    try {
        const response = await getResponse(course as string || course as undefined);
        console.log({response})
        res.status(200).json(response) 
    } catch (e) {
    
        res.status(400).json(e);
    }
    }
}

const getResponse = async(course?: any) => {
    const client = await clientPromise;
    const db = client.db("liveschool");
    let resArray: any = [];
    let i = 1;
    
    if(course != undefined){
        
        var myCursor = await db.collection("classes").find({ course: course });
            while(i != 0){
              var document = await myCursor.hasNext() ? await myCursor.next() : i--;
                if(document != 1){
                resArray.push(document)
              }
                
            }
           
    }
    else{
        
        var myCursor = await db.collection("classes").find();
            while(i != 0){
                
              var document = await myCursor.hasNext() ? await myCursor.next() : i--;
              if(document != 1){
                resArray.push(document)
              }
            }
            
    }
    
    return resArray;
}
    