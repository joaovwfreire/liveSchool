import { useState } from 'react';
import {
    useCreateStream,
    useStream,
    useStreamSessions,
    useUpdateStream,
  } from '@livepeer/react';   
import Link from 'next/link';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';
  
  const streamName = `New Stream`;
  
  export const Stream = (data: any) => {
    const [courseName, setCourseName] = useState<any>("");
  const [courseDescription, setCourseDescription] = useState<any>("");
  const [teacher, setTeacher] = useState<any>("");
  const [amount, setAmount] = useState<any>("");
  const { address } = useAccount({
    onConnect({ address, isReconnected }) {
      
    },
  });

    function onChangeCourse (e: any) {
      setCourseName(e.target.value)
    };
    function onChangeDescription (e: any) {
      setCourseDescription(e.target.value)
    };
    function onChangeTeacher (e: any) {
      setTeacher(e.target.value)
    };
    function onChangeAmount (e: any) {
      setAmount(e.target.value)
    };

    const sendNotification = async () =>{
      toast.loading('Notifying users')
      await axios({
        method: 'post',
        url: '/api/createClass',
        data: {
          course: data.props.props.name,
          class_name: data.props.props.nftId,
          description: courseDescription,
          teacher_wallet: address,
          link: `https://liveschool-player.vercel.app/player/${stream?.playbackId}`
        }
       }).then((response: any)=>{
        //toast.success(response)
       
        toast.success('Succesfull')
      }).catch((e: any) =>{
        //toast.error(e)
        
        toast.error('Failed')
      })
    }

    const { mutate: createStream, data: createdStream } = useCreateStream(
      streamName ? { name: streamName } : null,
    );
    const { data: stream } = useStream({  
      streamId: createdStream?.id,
      refetchInterval: 10000,
    });
    const { data: streamSessions } = useStreamSessions({
      streamId: createdStream?.id,
    });
    const { mutate: updateStream } = useUpdateStream(
      stream
        ? {
            streamId: stream?.id,
            record: true,
          }
        : null,
    );
  
    return (
      <div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Course Name</span>
          </label>
          <input type="text" placeholder={data.props.props.name} className="input input-bordered input-primary" onChange={onChangeCourse} disabled/>
        </div>
        <div className="form-control">
            <label className="label">
                <span className="label-text text-lg">Course id</span>
            </label>
            <input className="textarea textarea-accent" placeholder={data.props.props.nftId} onChange={onChangeDescription} disabled></input>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Class title</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered input-primary" onChange={onChangeCourse} />
        </div>
        <div className="form-control">
            <label className="label">
                <span className="label-text text-lg">Description</span>
            </label>
            <textarea className="textarea textarea-accent" placeholder="Description" onChange={onChangeDescription}></textarea>
        </div>
        <button className='w-5/6 btn mt-5 mb-5' onClick={() => createStream?.()}>Create Stream<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg></button>
<button className='w-5/6 btn mt-5 mb-5' onClick={sendNotification}>Notify<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg></button>
        {stream && (
          <>
            <div className='bg-black mt-3'>
            <p className='animated-paragraph text-xl pt-2 px-3 font-bold'>DO NOT SHARE</p>
              <p className='animated-paragraph text-xl  px-3 mb-3'>Stream Key: {stream.streamKey}</p>
              <hr></hr>
              <p className='animated-paragraph2 text-xl pt-2 px-3 pb-2'>Stream Id: {stream.playbackId}</p>
              
            </div>
            
            <div className=' mt-3 flex'>
            <p className=' mt-5 text-xl pb-2 px-3 font-bold'><Link href={`https://liveschool-player.vercel.app/player/${stream.playbackId}`} passHref><a target='_blank'><button className='btn btn-accent w-5/6'>Watch it live </button></a></Link></p>
              
             <p className=' mt-5 text-xl pb-2 px-3 font-bold'><Link href='https://docs.livepeer.org/guides/developing/stream-via-obs' passHref className='text-xl pt-2 px-3'><a target='_blank'>
                <button className='btn btn-primary w-5/6 '>How to setup your stream</button></a>
              </Link>
              </p> 
            </div>
          </>
        )}  
       
        
      </div>
    );
  };