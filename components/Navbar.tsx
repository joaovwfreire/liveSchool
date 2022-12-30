import { ConnectButton } from '@rainbow-me/rainbowkit';
import * as React from 'react';

const Navbar = () => { 
    return(
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
      <li><a href='/' className='btn btn-primary my-1 text-white'>Home</a></li>
      <li><a href='/dashboard' className='btn btn-accent my-1 '>Dashboard</a></li>
      <li><a href='/createCourse' className='btn btn-primary my-1 text-white'>Create Course</a></li>
      
      <li><a href='about' className='btn btn-accent my-1 '>About</a></li>
      <li><a href='controlpanel' className='btn btn-primary my-1 text-white'>Control panel</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl" href='/'>liveSchool</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a href='/' className='btn btn-primary mx-2 text-white'>Home</a></li>
      <li><a href='/dashboard' className='btn btn-accent mx-2 '>Dashboard</a></li>
      <li><a href='/createCourse' className='btn btn-primary mx-2 text-white'>Create Course</a></li>
      
      <li><a href='about' className='btn btn-accent mx-2 '>About</a></li>
      <li><a href='controlpanel' className='btn btn-primary mx-2 text-white'>Control panel</a></li>
      
    </ul>
  </div>
  <div className="navbar-end">
    <div className='btn'>
    <ConnectButton />
    </div>  
    <a className="btn">Connect</a>
  </div>
  
</div>
    )}    


export default Navbar;