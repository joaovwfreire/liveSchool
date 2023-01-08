import { useEffect, useState  } from 'react';
import axios from 'axios';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import toast from 'react-hot-toast';
import Link from 'next/link';
import abi from "../abi/token.json";
require ('dotenv').config()

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}



  export const TransferAsset = (passedData: any) => {
    const [wallet, setWallet] = useState<any>("");
    const { address } = useAccount({
      onConnect({ address, isReconnected }) {
        
      },
    });
    
  const debouncedWalletAddress = useDebounce(wallet, 500)

    const { config, error, isError  } = usePrepareContractWrite({
      
      address: '0xdbC7cb706FaEF5e4c32d3Ee14ED45a0C5573a93a',
      abi: abi,
      functionName: 'safeTransferFrom',
      args: [address, debouncedWalletAddress, passedData.props.props.nftId, 1, '0x'],
      
      enabled: Boolean(debouncedWalletAddress),
      
    })
    
    const { data, write } = useContractWrite(config)
    
    
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    })

    function onChangeWallet (e: any) {
      setWallet(e.target.value)
    };
    
    const sendPass = async()=> {
        await axios({
            method: 'post',
            url: '/api/transferAccessPass',
            data: {
              course: passedData.props.props.name,
              nft_id: passedData.props.props.nftId,
              receiver: wallet
            }
           }).then((response: any)=>{
            //toast.success(response)
            
        
          }).catch((e: any) =>{
            //toast.error(e)
            
          })
    }

  
    return (
      <div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Course Name</span>
          </label>
          <input type="text" placeholder={passedData.props.props.name} className="input input-bordered input-primary" disabled/>
        </div>
        <div className="form-control">
            <label className="label">
                <span className="label-text text-lg">Course id</span>
            </label>
            <input className="textarea textarea-accent" placeholder={passedData.props.props.nftId} disabled></input>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text text-lg">Wallet address</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered input-primary" onChange={onChangeWallet} />
        </div>
        <button className='w-5/6 btn mt-5 mb-5'  disabled={!write || isLoading}  onClick={() => write()} >
        {isLoading ? 'Sending access pass...' : 'Send access pass'}
      </button>
      {isError && <div>Error: {error.message}</div>}
      {isSuccess && (
        <div>
          Successfully sent access pass!
          <div>
            <Link href={`https://polygonscan.com/tx/${data?.hash}`} passHref ><a target="_blank" >View on PolygonScan</a></Link>
          </div>
        </div>
      )}
    

      </div>
    );
  };