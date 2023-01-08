import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

import * as React from 'react';

const Navbar = () => { 
    return(
      
        <div className="navbar bg-base-100 absolute">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><Link href='/' ><button className='btn btn-primary my-1 text-white'>Home</button></Link></li>
      <li><Link href='/dashboard' ><button className='btn btn-accent my-1 '>Dashboard</button></Link></li>
      <li><Link href='/createCourse' ><button className='btn btn-primary my-1 text-white'>Create Course</button></Link></li>
      
      <li><Link href='/about'><button className='btn btn-accent my-1 '>About</button></Link></li>
      <li><Link href='/controlpanel'><button className='btn btn-primary my-1 text-white'>Control panel</button></Link></li>
      <li><Link href='/notifications'><button className='btn btn-accent my-1 '>Notifications</button></Link></li>
      </ul>
    </div>
    <Link href='/'><button className="btn btn-ghost normal-case text-xl">liveSchool</button></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link href='/'><button className='btn btn-primary mx-2 text-white'>Home</button></Link></li>
      <li><Link href='/dashboard'><button className='btn btn-accent mx-2 '>Dashboard</button></Link></li>
      <li><Link href='/createCourse'><button className='btn btn-primary mx-2 text-white'>Create Course</button></Link></li>
      
      <li><Link href='/about' ><button className='btn btn-accent  mx-2 '>About</button></Link></li>
      <li><Link href='/controlpanel' ><button className='btn btn-primary mx-2 text-white'>Control panel</button></Link></li>
      <li><Link href='/notifications' ><button className='btn btn-accent mx-2 '>Notifications</button></Link></li>
     
    </ul>
  </div>
  <div className="navbar-end">
    <div >
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className='btn mx-2'>
                    Connect 
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className='btn mx-2'>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', overflow: 'hidden' }}>
                  <button
                    onClick={openChainModal}
                    type="button"
                  >
                    <div className='btn mr-2'>
                    {chain.hasIcon && ( 
                      
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                        }}
                        className = 'mx-2'
                      > 
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 16, height: 16 }}
                          />
                        )}
                      </div>
                    )}
                    
                    {chain.name}
                    </div>
                  </button>

                  <button onClick={openAccountModal} type="button" className='btn '>
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
    </div>   
  </div>
  
</div>
    )}    


export default Navbar;