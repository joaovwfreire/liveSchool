import type { NextApiRequest, NextApiResponse } from "next";
import { BaseContract, ethers } from "ethers";
import abi from '../../../abi/token.json';
import { randomInt } from "crypto";

/*
node.js does not handle parallel requests in a pleasant way.
as this request takes a decent amount of time, the quick solution is clusterizing
api instances with pm2. 
*/

const provider = new ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);

/* 
the figureTokenId function can be optimized in many ways. 
If this project moves forward, consider caching the last valid token Id OR
deploying an event listener to update the stored maxId value whenever a mint event happens. 
*/
const figureTokenId = async () =>{
    const tokenContract = new ethers.Contract(process.env.ERC_1155_CONTRACT_ADDRESS as string, abi, provider);

    
    let found = false;
    let itr = 0;
    while(!found){
        
        let itrUri = await tokenContract.uri(itr);
        
        if(!itrUri){
            let totalSupply = await tokenContract.totalSupply(itr);
            if (totalSupply == 0){
                found = true;
            }
        }
        itr++;
    }
    return itr;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const uri = req.body.uri;
  const receiverAddress = req.body.receiver;
  const amount = req.body.amount;
  const nextTokenId = randomInt(10000000);

  if (req.method === "POST" && uri && receiverAddress && amount && nextTokenId) {
    // needs to update db with all the data in case the request is succesfull.
    // DO NOT FORGET THIS
    
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
                  mint_to_address: receiverAddress,
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
            .then(response => res.status(200).json({response, id: nextTokenId}))
            .catch(err => console.error(err));
            
        
    } catch (e) {

      res.status(400).json(e);
    }
  }
}
