import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    
    <div className='bg-slate-100'>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.main}>
      <div className='box'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className='box2'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>


        <div className="flex w-full">
  <div className="grid h-20 flex-grow card rounded-box place-items-center">

</div>


</div>
<div className="overflow-x-auto w-5/6 mt-5 place-content-center place-items-center">
<h1 className='text-4xl text-bold'>User Dashboard</h1>
  <table className="table mt-5 w-full place-self-center">
   
    <thead >
      <tr >
        
        <th className='bg-secondary'>Course</th>
        <th className='bg-secondary'>Students</th>
        <th className='bg-secondary'>Start Date</th>
        <th className='bg-secondary'>End Date</th>
        <th className='bg-secondary'></th>
      </tr>
    </thead>
    <tbody>
    
      <tr>
        
        <td>
          <div className="flex items-center space-x-3">

            <div>
              <div className="font-bold">How to dive deeper</div>
              <div className="text-sm opacity-50"></div>
            </div>
          </div>
        </td>
        <td>
          35
          <br/>
        </td>
        <td>10/23/22 10:00 UTC</td>
        <td>12/23/22 10:00 UTC</td>
        <th>
        <label htmlFor="my-modal-3" className="btn btn-accent btn-xs">details</label>
        </th>
      </tr>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
<div className="modal">
  <div className="modal-box relative">
    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
  </div>
</div>
<tr>
        
        <td className="font-bold">

              How to talk so much other people are annoyed with you wefawegawewaegawegawegawegfwefwefwefwe

        </td>
        <td>
          35
          <br/>
        </td>
        <td>10/23/22 10:00 UTC</td>
        <td>12/23/22 10:00 UTC</td>
        <th>
        <label htmlFor="my-modal-3" className="btn btn-accent btn-xs">details</label>
        </th>
      </tr>
      
      <tr>
        
        <td>
          <div className="flex items-center space-x-3">
           
            <div>
              <div className="font-bold">CS:70</div>
              <div className="text-sm opacity-50"></div>
            </div>
          </div>
        </td>
        <td>
          35
          <br/>
        </td>
        <td>10/23/22 10:00 UTC</td>
        <td>12/23/22 10:00 UTC</td>
        <th>
        <label htmlFor="my-modal-3" className="btn btn-accent btn-xs">details</label>
        </th>
      </tr>
      
      <tr>
        
        <td>
          <div className="flex items-center space-x-3">
            
            <div>
              <div className="font-bold">Introduction to cryptography</div>
            </div>
          </div>
        </td>
        <td>
          35
          <br/>
        </td>
        <td>10/23/22 10:00 UTC</td>
        <td>12/23/22 10:00 UTC</td>
        <th>
        <label htmlFor="my-modal-3" className="btn btn-accent btn-xs">details</label>
        </th>
      </tr>
    </tbody>
    <hr/>
    <tfoot >
   <hr/>
   <hr/>
    </tfoot>
    
  </table>
  
</div>

      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;