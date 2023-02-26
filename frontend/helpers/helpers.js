import { NFTStorage } from 'nft.storage'
const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY
const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

export const storeBlob = async (files) => {
  const fileBlob = new Blob([files[0]])
  const fileCID = await nftstorage.storeBlob(fileBlob)
  return fileCID
}

export const storeNFT = async (image, name, desc) => {
  const imageCID = await nftstorage.storeBlob(image)
  const nftName = "UFJ - "+name      
  const nft = {        
    image: "https://"+ imageCID +".ipfs.nftstorage.link/",
    external_url: "https://mix-martial-judge.vercel.app/",
    name: nftName,
    description: desc,        
  }
  const formatData = JSON.stringify(nft)
  const nftBlob = new Blob([formatData], { type: 'application/json'})
  const nftCID = await client.storeBlob(nftBlob);
  
  return "ipfs://"+nftCID
}
