import { randomInt } from "crypto";
import { BaseContract, BigNumber, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../server/mongo/middleware/mongodb";
import abi from '../../abi/token.json';


const getBalances = async(address: String, ids: [Number]) =>{

    const provider = new ethers.providers.AlchemyProvider('matic', process.env.ALCHEMY_API_KEY);  
    const tokenContract = new ethers.Contract(process.env.ERC_1155_CONTRACT_ADDRESS as string, abi, provider);  
    type IdAndAmount = {
        id: any;
        amount: any;
    }
    let response: any[] = [] ;
    let addressArray: any = [];
    
    ids.forEach((x, i) =>{
        addressArray.push(address);
    
        
    });
    console.log(2)
    const batchBalances = await tokenContract.balanceOfBatch(addressArray, ids);
   
    ids.forEach((x, i) =>{
        
        let amountForId: IdAndAmount = {
            id: x,
            amount: batchBalances[i]
        }
        response.push(amountForId)
        
        
    });

    return response;
}
    
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

   const userWallet = req.body.wallet;       

    
    if (req.method === "GET") {
        let idsArray: any = [];
    try {
           
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: `${process.env.NFT_PORT_KEY}`
            }
            };
        for(let i = 1; i <= parseInt(process.env.CEIL_NFTS_DIV_50 as string); i++ ){
        await fetch(`https://api.nftport.xyz/v0/nfts/${process.env.ERC_1155_CONTRACT_ADDRESS}?chain=polygon&page_number=${i}&page_size=50&include=metadata&refresh_metadata=false`, options)
            .then(response => response.json())
            .then(response => 
                response.nfts.map((x: any) => {
                    
                    idsArray.push(parseInt(x.token_id));
                    
                })
            )
            .catch(err => console.error(err));
        }
        
           const batch = await getBalances(userWallet, idsArray);

            res.status(200).json(batch)
            
   
        } catch (e) {
    
          res.status(400).json(e);
        }
      }
    }
    