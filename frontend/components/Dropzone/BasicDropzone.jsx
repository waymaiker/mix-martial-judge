import React from 'react';
import {useDropzone} from 'react-dropzone';
import { NFTStorage, Blob } from 'nft.storage'


import { Flex, Input, Text } from '@chakra-ui/react';

export default function BasicDropzone({setFileData}) {
  const client = new NFTStorage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFFMjY2ODcyNTdDYkVGZjE1NThFYTJGOTI4ZDk5RDRlOTkxRmM1QzYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NjUxNzY2NjE3MywibmFtZSI6Ik1NSiJ9.MKB0pwlczOEyl23_8JW2SDn6So9Y34NNqR5aT3DlEQw"})
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDropAccepted: async (files) => {
      const fileBlob = new Blob([files[0]])
      const fileCID = await client.storeBlob(fileBlob)
      
      setFileData({
          "CID": fileCID,
          "Link": "https://"+fileCID+".ipfs.dweb.link/"
        }
      )
    }
  });
  
  const files = acceptedFiles.map(file => (
    <Text key={file.path} ml="1">
      {file.path} - {file.size} bytes
    </Text>
  ));

  return (
    <Flex direction={"column"}>
      <Flex h={"15vh"} w="85vh"  {...getRootProps({className: 'dropzone'})} alignItems='center' justifyContent='center' border="1px" borderStyle={"dashed"} borderRadius="xl">
        <Input {...getInputProps()} />
        <Text fontWeight={'bold'} fontStyle='italic'>Drag 'n' drop here the picture you want to use, or click to select it</Text>
      </Flex>
      <Flex direction={"column"} mt={"5"}>
        <Text fontWeight={'bold'}>File</Text>
        <Text>{files}</Text>
      </Flex>
    </Flex>
  );
}