import React, { useState } from 'react'
import { useUploader } from '@w3ui/react-uploader'
import { withIdentity } from '../components/Authenticator'

export function ContentPage () {
    const [{ storedDAGShards }, uploader] = useUploader()
    const [file, setFile] = useState<any>(null)
    const [dataCid, setDataCid] = useState<any>('')
    const [status, setStatus] = useState<any>('')
    const [error, setError] = useState<any>(null)
  
    if (!uploader) return null
  
    const handleUploadSubmit = async(e: any) => {
      e.preventDefault()
      try {
        setStatus('uploading')
        const cid = await uploader.uploadFile(file)
        setDataCid(cid)
      } catch (err) {
        console.error(err)
        setError(err)
      } finally {
        setStatus('done')
      }
    }
  
    if (status === 'uploading') {
      return <Uploading file={file} storedDAGShards={storedDAGShards} />
    }
  
    if (status === 'done') {
      return error ? <Errored error={error} /> : <Done file={file} dataCid={dataCid} storedDAGShards={storedDAGShards} />
    }
  
    return (
      <form onSubmit={handleUploadSubmit}>
        <div className='db mb3'>
        <label className="label"><span className="label-text text-lg">Pick a file for access pass NFT</span>
        </label>
          <input id='file' className='db pa2 w-100 ba br2 file-input file-input-bordered w-full max-w-xs' type='file' onChange={(e: any) => setFile(e.target.files[0])} required />
        </div>
        <button type='submit' className='ph3 pv2 btn mt-2'>Upload to W3 Storage</button>
      </form>
    )
  }
  
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
      <h1 className='near-white'>?????? Error: failed to upload file: {error.message}</h1>
      <p>Check the browser console for details.</p>
    </div>
  )
  
  const Done = ({ file, dataCid, storedDAGShards }: any) => (
    <div>
      <h1 className='near-white'>Done!</h1>
      <p className='f6 code truncate'>{dataCid.toString()}</p>
      <p><a href={`https://w3s.link/ipfs/${dataCid}`} className='blue' target='blank'>View {file.name} on IPFS Gateway.</a></p>
      <p className='near-white'>Chunks ({storedDAGShards.length}):</p>
      {storedDAGShards.map(({ cid, size }: any) => (
        <p key={cid.toString()} className='f7 truncate'>
          {cid.toString()} ({size} bytes)
        </p>
      ))}
    </div>
  )
  
  export default withIdentity(ContentPage)