import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { withIdentity } from '../components/Authenticator'
import { useUploader } from '@w3ui/react-uploader'
import { Player } from '@livepeer/react';


const Upload = (data: any) => {
  const [className, setClassName] = useState<any>("");
  const [courseDescription, setCourseDescription] = useState<any>("");
  const [teacher, setTeacher] = useState<any>("");
  const [amount, setAmount] = useState<any>("");

  const [{ storedDAGShards }, uploader] = useUploader()
  const [file, setFile] = useState<any>(null)
  const [dataCid, setDataCid] = useState<any>('')
  const [status, setStatus] = useState<any>('')
  const [error, setError] = useState<any>(null)

  function onChangeCourse (e: any) {
    setClassName(e.target.value)
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

  const Uploading = ({ file, storedDAGShards }: any) => (
    <div className='flex items-center'>
      <div className='spinner mr3 flex-none' />
      <div className='flex-auto'> 
        <p className='truncate'>Uploading DAG for {file.name}</p>
        {storedDAGShards.map(({ cid, size }: any) => (
          <p key={cid.toString()} className='f7 truncate'>
            {cid.toString()} ({size} bytes)
          </p>
        ))}
      </div>
    </div>
  )
  
  const Errored = ({ error }: any) => (
    <div>
      <h1 className='near-white'>⚠️ Error: failed to upload file: {error.message}</h1>
      <p>Check the browser console for details.</p>
    </div>
  )
  
  const Done = ({ file, dataCid, storedDAGShards }: any) => (
    <div>
      <h1 className='near-white text-xl'>Done!</h1>
      
      {storedDAGShards.map(({ cid, size }: any) => (
        <p key={cid.toString()} className='f7 truncate text-xl'>
          File CID: {cid.toString()} - Size:({size} bytes)
        </p>
      ))}
    </div>
  )


  if (!uploader) return null
  
    const handleUploadSubmit = async(e: any) => {
      e.preventDefault()
      try {
        setStatus('uploading')
        const cid = await uploader.uploadFile(file as unknown as Blob)
        setDataCid(cid)
      } catch (err) {
        console.error(err)
        setError(err)
      } finally {
        setStatus('done')
      }
    }
  
    const uploadVideo = async () => {
      
      toast.loading("Attempting to upload a new video.")
      
      await axios({
        method: 'post',
        url: '/api/uploadVideo',
        data: {
          course: data.props.props.name,
          class_name: className,
          description: courseDescription,
          teacher_wallet: data.props.props.teacher,
          video_link: `https://${dataCid}.ipfs.w3s.link/`
        }
       }).then((response: any)=>{
        toast.success(`Video succesfully uploaded!`)
        
    
      }).catch((e: any) =>{
        toast.error(e)
      })
    }
  

    
  return (

      <main >

<div className="">
      <div className="card-body">
        <div className='card-title'>Upload video</div>
        
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

        {status == '' && 
        <form onSubmit={handleUploadSubmit}>
        <div className='db mb3'>
        <label className="label"><span className="label-text text-lg">Video file</span>
        </label>
          <input id='file' className='db pa2 w-100 ba br2 file-input file-input-bordered w-full max-w-xs' type='file' onChange={e => setFile(e.target.files[0])} required />
        </div>
        <button type='submit' className='ph3 pv2 btn mt-2'>Upload to W3 Storage</button>
      </form>}
        
      {status === 'uploading' &&
      <Uploading file={file} storedDAGShards={storedDAGShards} />
    }
  
    {status === 'done' &&
        <div>
        <Done file={file} dataCid={dataCid} storedDAGShards={storedDAGShards} />
        <p>Please wait for the file upload.</p>
        {dataCid && 

          <Player
            title={'Preview'}
            src={`https://w3s.link/ipfs/${dataCid}`}
            autoPlay
            muted
            autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link' }}
          />
          }
        <p className="text-xl" >Or visit <p><a href={`https://w3s.link/ipfs/${dataCid}`} className='blue text-xl' target='blank'>{file?.name}</a></p> to view the uploaded video on IPFS gateaway.</p>
        </div>
     
      
    }
      
        <div className="form-control mt-6">
          <label htmlFor="my-modal-3" className="btn ">Proceed to order review  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
</svg></label>
        </div>
      </div>
    </div>
    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box h-11/12 max-h-5xl relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Review class upload.</h3>
    <p className="py-4 mb-1">Please check the details before uploading your class!</p>
    <p>Course Name: {data.props.props.name}</p>
    <p>Class: {className}</p>
    <p>Description: {courseDescription}</p>
    { dataCid != null &&
    <div>
    <a href={`https://w3s.link/ipfs/${dataCid}`} target='blank'>Video link: {`https://w3s.link/ipfs/${dataCid}`}  </a>
    
      </div>
      }
    
    <div className="form-control mt-5">
  <label className=" label">  
  <p className="text-bold">I have reviewd my order</p>
    <input type="checkbox"  className="checkbox  mr-10" />
  </label>
  <button className='btn place-self-end mx-3' onClick={uploadVideo}>Agree and create class</button>
</div>
    

  </div>
</div>
      </main>

  );
};

export default withIdentity(Upload);
