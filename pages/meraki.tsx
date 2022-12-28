import Head from "next/head";
import Navbar from "../components/Navbar";
import type { NextPage } from 'next';


const Meraki: NextPage = () => {
    return(

<div className="flex bg-gray-900 h-screen flex-row">
<Head>
  <title>Game Payy</title>
  <link rel="icon" href="/favicon.ico" />
</Head>

  


<div className="flex flex-col w-full">
<Navbar />
  <div className="text-white justify-content">
    <h1>Link Epic games account</h1>
    <p>To link your account, first login with your google account</p>
    <p>Retrieve the Authorization code at the following link:</p>

    <p>Then paste it in the following field:</p>
    <br />
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <form></form>
        <input
          type="email"
          className="
form-control
mb-3
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-gray-100 bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
          id="exampleFormControlInput5"
          placeholder="aaa"
          aria-label="Disabled input example"
          disabled
        />
        <input
         
          type="text"
          className="
form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
          id="exampleEmail01"
          placeholder="Epic games auth key"
        />
        <div className="text-sm text-gray-500 mt-1">
          Authorization key{" "}
        </div>
        <span className="">
          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-primary text-black font-medium text-xs leading-tight uppercase hover:bg-[#51AD51] transition duration-150 ease-in-out cursor-pointer"
          >
            Link account
          </button>
        </span>
      </div>
    </div>
    <div className="flex flex-col">
      <h3 className="mb-4">Game Stats</h3>
      
    </div>
  </div>
</div>
</div> 

)}

export default Meraki;
