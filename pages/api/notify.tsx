import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'

// You'll want to replace this with a wallet from your application
const wallet = Wallet.createRandom()


const main = async () => {

// You'll want to replace this with a wallet from your application
const wallet = Wallet.createRandom()

// Create the client with a `Signer` from your application
const xmtp = await Client.create(wallet)
const conversations = xmtp.conversations

// Start a scoped conversation with ID mydomain.xyz/bar. And add some metadata
const conversation2 = await xmtp.conversations.newConversation(
    '0xf7e956CE22F73E9FeF8aC920Eb5b9547893D353D',
    {
      conversationId: 'aaaaa.xyz/bar',
      metadata: {
        title: 'Bar conversation',
      },
    }
  )
  await conversation2.send('A new class for course Olefe oeflefp has been uploaded')
      await conversation2.send('https://bafybeifikiketkrth2ls5lh6cqtsl7r2rlywbm7qo3lboi2oaaqttvt3kq.ipfs.w3s.link/gas-mask-7105073-5752497.mp4')
      

  
}
main();