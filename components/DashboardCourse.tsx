import React from 'react';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { UUIDContext } from '../context'
import LitJsSdk from 'lit-js-sdk';
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';
import { Player } from '@livepeer/react';
import axios from 'axios';

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
  const { address } = useAccount({
    onConnect({ address, isReconnected }) {
      
    },
  });
  const storedData = data
  let videoResponse:any ;
  let classResponse: any;
  let vResponse: any;

  
  
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
  const [videosResponse, setVideosResponse] = useState<any>([]);
  const [classesResponse, setClassesResponse] = useState<any>([]);
  const [litAuth, setLitAuth] = useState<any>(false);
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
      toast.loading("Fetching course uploaded content and livestreams.")
      setLitAuth(true);    
      
      
    } catch (err: any) {
      
      toast.error('error: '+ err.message)
    }
    
  }

  useEffect(()=>{
    const vRequest = async()=> {
       
      if(litAuth == true){
      await axios.get(`/api/getVideos/?course=${storedData.props.name}`)
      .then((response: any)=>{
        
        setVideosResponse(response.data);
    
      }).catch((e: any) =>{
        
        toast.error(e)
      })

      await axios.get(`/api/getClasses/?course=${storedData.props.name}`)
      .then((response: any)=>{
        
        setClassesResponse(response.data);
    
      }).catch((e: any) =>{
        
        toast.error(e)
      })
      
    }
    setLitAuth(false)
  }
  vRequest()}, [litAuth])




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
    <label htmlFor={data.props.nftId} className="btn btn-accent btn-xs">details<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg></label>
    </th>
    <input type="checkbox" id={data.props.nftId} className="modal-toggle" />
    <div className="modal">
  <div className="modal-box w-full relative self-center">
    <label htmlFor={data.props.nftId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    {
        !connected && <div className=''><button onClick={connect} className='btn my-2 w-5/6'>Unlock content<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
        </svg></button> <div className="text-sm opacity-50"  >Lit access control will check possession of the digital asset of ID: {data.props.nftId}</div> </div>
      }
      {
        connected && <div>
    <p className="py-4">Auth: {address} </p>

 </div>
      }
      <div>
      <div>
        <h3 className=' text-2xl font-bold'>Live Streams</h3>
        
        {
          classesResponse && 
          classesResponse.map((x:any, i: number) =>{
            return(
              <div className='' key={i}>
                <hr/><hr/>
                <p className='text-lg font-bold mt-3'>Course: {x.course}</p>
                <p className='text-lg font-bold'>Title: {x.name}</p>
                <p className='text-md'>Teacher: {x.teacher}</p>
                <p className='text-md'>Description: {x.description}</p>
                <button className='text-lg  btn btn-primary my-2 w-5/6'><Link href={x.streamLink} passHref><a target='_blank'>Watch it now!</a></Link></button>
                
              </div>
            )
          })
      
      }
</div>
      <div>
      <h3 className='mt-5 text-2xl font-bold'>Past Videos</h3>
      
      {
        
        videosResponse && 
        videosResponse.map((x:any, i:number) =>{
          return(
            <div className='' key={i}>
              <hr/><hr/>
            <p className='text-lg font-bold mt-3'>Course: {x.course}</p>
            <p className='text-lg font-bold'>Title: {x.name}</p>
            <p className='text-md'>Teacher: {x.teacher}</p>
            <p className='text-md'>Description: {x.description}</p>
            <Player
            title={x.name}
            src={x.video}
            autoPlay
            muted
            
          />
          <button className='btn btn-accent text-lg w-5/6 mt-2 mb-2 flex'><Link href={x.video} passHref><a target='_blank'>Watch it now! </a></Link></button>
            
            <hr/><hr/>
          </div>
          )
        })
        
}
      </div>
      
</div>
</div>
</div>
  </tr>)
}