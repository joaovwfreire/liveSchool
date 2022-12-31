import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import Navbar from '../components/Navbar';
import { KeyringProvider, useKeyring } from '@w3ui/react-keyring'
import { UploaderProvider } from '@w3ui/react-uploader'
import { UUIDContext } from '../context'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid';
require ('dotenv').config()

const id = uuid()

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});


const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: process.env.ALCHEMY_API_KEY as string,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'liveSchool',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function AgentLoader ({ children }) {
  const [, { loadAgent }] = useKeyring()
  // eslint-disable-next-line
  useEffect(() => { loadAgent() }, []) // load agent - once.
  return children
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  function navigate() {
    router.push(`/protected?id=${id}`)
  }
  return (
    <LivepeerConfig client={livepeerClient}>
      <KeyringProvider>
      <UploaderProvider>
        <AgentLoader>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <html data-theme="corporate">
        <Navbar/>

        <hr/>
        <UUIDContext.Provider value={{
        id
      }}>
        <Component {...pageProps}/>
        </UUIDContext.Provider>
        </html>
      </RainbowKitProvider>
    </WagmiConfig>
    </AgentLoader>
      </UploaderProvider>
    </KeyringProvider>
    </LivepeerConfig>
  );
}

export default MyApp;
