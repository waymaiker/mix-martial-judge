import React from 'react';
import {useDropzone} from 'react-dropzone';
import { NFTStorage, Blob } from 'nft.storage'

import { Flex, Input, Text } from '@chakra-ui/react';

export default function BasicDropzone({storeNFT, setImage, setFileData}) {
  const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY })
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDropAccepted: async (files) => {
      const fileBlob = new Blob([files[0]])
      const fileCID = await client.storeBlob(fileBlob)
      storeNFT == undefined
       ? setFileData({ "CID": fileCID, "Link": "https://"+fileCID+".ipfs.dweb.link/"})
       : setImage(files[0])
    }
  });

  const files = acceptedFiles.map(file => (
    <Text key={file.path}>
      {file.path} - {file.size} bytes
    </Text>
  ));

  return (
    <Flex h={"15vh"} w={storeNFT == undefined ? "85vh" : "100%"} mt={storeNFT == undefined ? "0" : "5"} {...getRootProps({className: 'dropzone'})} alignItems='center' justifyContent='center' border="1px" borderStyle={"dashed"} borderRadius="xl">
      <Input {...getInputProps()} />
      {
        files.length > 0
          ? <Text fontWeight={'bold'}> File dropped {files} </Text>
          :  <Text fontWeight={'bold'} fontStyle='italic'>
              Drag 'n' drop here the picture you want to use, or click to select it
            </Text>
      }
    </Flex>
  );
}