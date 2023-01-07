# Liveschool

## About
liveSchool is a dApp built for Encode Next Video Build hackathon.

It enables content creators to create new courses and easily set up gated-access to their live streams and uploaded videos. 

## QuickStart
Clone this repositoy:
```
git clone https://github/joaovwfreire/liveSchool.git
```

Install modules:
```
npm install
```

Create a .env file similar to .env.example

Run at development environment:
```
npm run dev
```

##  Lit Access Control
By using Lit Access control, relevant data  access is restricted. Only users that own an nft minted by
the content creator can view livestreams links and uploaded videos. 
At the control panel, in order to upload new videos, start 
live streams and tranfer access passes to the user, one must own one asset AND be the original teacher of the course.
In order to render different access control conditions at a single page, a react component that accepted props was instantiated by mapping data of api call responses:

```
const accessControlConditions = [
    {
      contractAddress: '0xdbc7cb706faef5e4c32d3ee14ed45a0c5573a93a',
      standardContractType: 'ERC1155',
      chain: "polygon",
      method: 'balanceOf',
      parameters: [   
        ':userAddress',
        (data.props.nftId).toString()
      ],
      returnValueTest: {
        comparator: '>',
        value: '0'
      }
    }
  ]
```
This logic can be found at the Dashboard and at the Control Panel pages.
        
##  LivePeer
LivePeer is the bread and butter of this application, as it provides components for automatic video playback for previews at 
the video upload component and at the uploaded videos session for access pass owners. LivePeer also handles the livestreams logic:
from generating the stream keys to providing links for the authenticated users to watch content.

 ![Alt text](https://bafkreidx3i5aexgzj5uh4k6jcn5fcj2ph57sgjxcxei25egj5rzt5gxnqq.ipfs.w3s.link/ "LivePeer Playback")

 ![Alt text](https://bafkreigvglxreix6u6cdldgj6jecryi2ie3wjos3totlep6id5u7dv2dvu.ipfs.w3s.link/ "LivePeer LiveStreams")
        
##  NFT Port      
NFT Port's apis were used to mint Digital Assets to a course creator's wallet address.
          
Upon a createCourse api call, the api calls NFT Port's batch minting endpoint in order to mint X amount of digital Assets 
to the designated course teacher. The following portion of code uses the apis to
generates metadata from a set of end-user passed values and follows up by deploying
new NFTs to the chain. 
```
const optionsForUriGen = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: process.env.NFT_PORT_KEY
        },
        body: JSON.stringify({name: course, description: description, file_url: url})
      };
      
      await fetch('https://api.nftport.xyz/v0/metadata', optionsForUriGen)
        .then(response => response.json())
        .then(response => uri = response.metadata_uri)
        .catch(err => console.error(err));
      
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              Authorization: `${process.env.NFT_PORT_KEY}`
            },
            body: JSON.stringify({
              tokens: [
                {
                  mint_to_address: teacher,
                  token_id: nextTokenId,
                  metadata_uri: uri,
                  quantity: amount
                }
              ],
              chain: 'polygon',
              contract_address: process.env.ERC_1155_CONTRACT_ADDRESS
            })
          };
          
          await fetch('https://api.nftport.xyz/v0/mints/customizable/batch', options)
            .then(response => { 
                upsertDatabase();
                res.status(200).json("Course creation succesfull! " + nextTokenId + " corresponds to this course's NFT id and can be seen at OpenSea." )
                
            })
            .catch(err => res.status(400).json(err));
```
All of this is done inside an api call, so environment variables are not discovered by packet sniffers.

##  W3 Storage
W3 storage was used to store Access Passes images and IPFS metadata alongisde video files. 

W3ui components handle all the file upload logic at this dApp. 

![Alt text](https://bafkreidapvhzxtxxcmdkfgquwawwwvaloxdzo4wcc45mioh2hu24xhejuy.ipfs.w3s.link/ "W3UI Upload")

##  XMTP
XMTP is used to notify access pass holders of any relevant event at the courses being taken. The events notified at LiveSchool are:
New livestreams and new video uploads.

One interesting view to have of XMTP's usage at this dApp is to portray it like a Web3 Twillio. It's apis are used for notification sending
to specific addresses.
At the notification page, a user can check it's own messages plus the latest news on the courses enrolled.
        
##  Why Polygon?
LiveSchool's purpose is to help teachers reach out to people wanting to learnat a much broader scale. 

Low gas fees do mean there's a very small entry barrier.

On top of that, many ground-breaking blockchain innovations are happening in Polygon, such as the Web3 Debt Card.

One of the top2 biggest Solana Game-Fi projects is coming to the chain as well.

Combine those elements with Polygon scaling solutions and the reason for picking it as LiveSchool's primary chain is clear:
it's very likely that Polygon will be the chain of choice for most new users.

## Known issues:
W3ui library uses node-fetch 3.23 and this breaks LivePeer's streaming component - uses node-fetch ^2.6.1. The workaround was redirecting streams
to new tabs at another domain. That is a problem as we cannot really control the access to those links.
    Potential fixes:
        Embedding the second application at the page while making sure cross-origin requests are only enabled for this specific purpose.
        Running the second application at a subdomain and adding some server-side status management.

        
        