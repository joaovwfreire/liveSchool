import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { UUIDContext } from '../context'
import LitJsSdk from 'lit-js-sdk';
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast';

interface DashboardComponent {
  name?: string;
  course?: string;
  teacher?: string;
  description?: string;
  ipfs?: string;
  nftId?: number;
  nextClass?: number;


}

export default function DashboardCourse (data: any){

  const accessControlConditions = [
    {
      contractAddress: '0xdbc7cb706faef5e4c32d3ee14ed45a0c5573a93a',
      standardContractType: 'ERC1155',
      chain: "polygon",
      method: 'balanceOf',
      parameters: [   
        ':userAddress',
        (data.props.nftId).toString()
      ],
      returnValueTest: {
        comparator: '>',
        value: '0'
      }
    }
  ]

  const [connected, setConnected] = useState(false)
  const { id } = useContext(UUIDContext)

  async function connect() {
    toast.loading("Attempting to unlock the content.")
    const resourceId = {
      baseUrl: 'http://localhost:3000',
      path: '/protected',
      orgId: "",
      role: "",
      extraData: id
    }

    const client = new LitJsSdk.LitNodeClient({ alertWhenUnauthorized: false })
    await client.connect()
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: 'polygon' })

    await client.saveSigningCondition({ accessControlConditions, chain: 'polygon', authSig, resourceId })
    try {
      const jwt = await client.getSignedToken({
        accessControlConditions, chain: 'polygon', authSig, resourceId: resourceId
      })
      console.log(jwt)
      Cookies.set('lit-auth', jwt, { expires: 1 })
      setConnected(true)
      toast.success("Succesfully authenticated.")
      toast.success("Please refresh the page, If you wish to connect to another course")

    } catch (err: any) {
      console.log(err)
      toast.error('error: '+ err.message)
    }
    
  }


return (
 <tr>
        
    <td>
      <div className="flex items-center space-x-3">

        <div>
          <div className="font-bold">{data.props.name}  </div>
          <div className="text-sm opacity-50">{data.props.course}</div>
        </div>
      </div>  
    </td>
    <td>
      {data.props.nftId} 
      <br/>
    </td>
    <td>{data.props && data.props.nextClass}</td>
    <th>
    <label htmlFor={data.props.nftId} className="btn btn-accent btn-xs">details</label>
    </th>
    <input type="checkbox" id={data.props.nftId} className="modal-toggle" />
    <div className="modal">
  <div className="modal-box relative self-center">
    <label htmlFor={data.props.nftId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    {
        !connected && <div className=''><button onClick={connect} className='btn my-2 w-5/6'>Unlock content</button> <div className="text-sm opacity-50"  >Lit access control will check possession of the digital asset of ID: {data.props.nftId}</div> </div>
      }
      {
        connected && <div><h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
    <p className="py-4">You've been qwpoqwgjqwgp for a chance to get one year of subscription to use Wikipedia for free!</p>
 </div>
      }
     </div>
</div>
  </tr>)
}