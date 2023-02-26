import React from 'react';
import { Flex, Input, Text } from '@chakra-ui/react';

import {useDropzone} from 'react-dropzone';
import { storeBlob } from '@/helpers/helpers';


export default function BasicDropzone({storeNFT, setImage, setFileData}) {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    onDropAccepted: async (files) => {
      const fileCID = await storeBlob(files)
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