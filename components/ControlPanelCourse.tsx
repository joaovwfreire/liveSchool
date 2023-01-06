import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { UUIDContext } from '../context'
import LitJsSdk from 'lit-js-sdk';
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast';
import Upload from '../components/Upload';
import { useAccount } from 'wagmi';
import { Stream } from './Stream';
import { TransferAsset } from './TransferAsset';

interface ControlPanelComponent {
  name?: string;
  course?: string;
  teacher?: string;
  description?: string;
  ipfs?: string;
  nftId?: number;
  nextClass?: number;


}

export default function ControlPanelCourse (data: any){
    const { address } = useAccount({
        onConnect({ address, isReconnected }) {
          
        },
      });

    const dataToPass = data;
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

  const [connected, setConnected] = useState<any>(false)
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
      
      Cookies.set('lit-auth', jwt, { expires: 1 })
      setConnected(true)
      toast.success("Succesfully authenticated as " + address)
      toast.success("Please refresh the page, If you wish to connect to another course")

    } catch (err: any) {
      
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
    <th>
      
   
    <label htmlFor={data.props.nftId} className="btn btn-accent btn-xs">upload video file <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg></label>
   
    </th>
    <th>
        
    <label htmlFor={data.props.name} className="btn btn-primary btn-xs">start new stream <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg></label>
  
    </th>
    <th>
        
    <label htmlFor={`modal${data.props.nftId}`} className="btn btn-accent btn-xs">send access pass <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg></label>
  
    </th>
    <input type="checkbox" id={data.props.nftId} className="modal-toggle" />
    <div className="modal">
  <div className="modal-box relative self-center w-5/6">
    <label htmlFor={data.props.nftId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    {
        !connected && <div className=''><button onClick={connect} className='btn my-2 w-5/6'>Unlock content<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg></button> <div className="text-sm opacity-50"  >Lit access control will check possession of the digital asset of ID: {data.props.nftId}</div> </div>
      }
      {
        connected && <div>
            <Upload props={dataToPass}/>
            
 </div>
      }
 </div>
      
     </div>

     <input type="checkbox" id={data.props.name} className="modal-toggle" />
    <div className="modal">
  <div className="modal-box relative self-center w-5/6">
    <label htmlFor={data.props.name} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    {
        !connected && <div className=''><button onClick={connect} className='btn my-2 w-5/6'>Unlock content<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg></button> <div className="text-sm opacity-50"  >Lit access control will check possession of the digital asset of ID: {data.props.nftId}</div> </div>
      }
      {
        connected && <div>
            
            <Stream props={dataToPass}/>
 </div>
      }
 </div>
      
     </div>

     <input type="checkbox" id={`modal${data.props.nftId}`} className="modal-toggle" />
    <div className="modal">
  <div className="modal-box relative self-center w-5/6">
    <label htmlFor={`modal${data.props.nftId}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    {
        !connected && <div className=''><button onClick={connect} className='btn my-2 w-5/6'>Unlock content<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg></button> <div className="text-sm opacity-50"  >Lit access control will check possession of the digital asset of ID: {data.props.nftId}</div> </div>
      }
      {
        connected && <div>
            
            <TransferAsset props={dataToPass}/>
 </div>
      }
 </div>
      
     </div>
     
  </tr>)
}