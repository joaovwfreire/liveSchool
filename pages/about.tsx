import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import LitJsSdk from 'lit-js-sdk';
import Cookies from 'js-cookie'
import { UUIDContext } from '../context'
import { useContext, useState } from 'react';




const Home: NextPage = () => {
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
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
<div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
      <div className="card-body">
        <div className='card-title'>About</div>
        <p>liveSchool is a dApp built for Encode's Next Video Build hackathon.</p>
        <p>It enables content creators to easily set up gated-access to their live streams and uploaded videos. </p>
        <h3 className='font-bold'>Lit Access Control</h3>
        <p>By using Lit Access control, the most relevant data - video files and stream links access is selective. Only users that own an nft minted by
          the content creator can view the content. </p>
        <h3 className='font-bold'>LivePeer</h3>
        <p>Lorem ipsum</p>
        <h3 className='font-bold'>NFT Port</h3>
        <p>Lorem ipsum</p>
        <h3 className='font-bold'>W3 Storage</h3>
        <p>Lorem ipsum</p>
        <h3 className='font-bold'>XMTP</h3>
        <p>Lorem ipsum</p>
        <h3 className='font-bold'>Why Polygon?</h3>
        <p>Lorem ipsum</p>
    </div>
    </div>
    </main>
    </div>
  )
};

export default Home;
