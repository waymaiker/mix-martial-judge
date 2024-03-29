import { useState } from "react";
import { ethers } from "ethers";
import { useSigner } from "wagmi";
import { Button, Flex, Image, Text, useToast } from "@chakra-ui/react";

import FightContract from '../../../contracts/Fight.json';

import useNavigationProvider from "@/hooks/useNavigationProvider";
import useDataProvider from "@/hooks/useDataProvider";
import { storeNFT } from "@/helpers/helpers";

import { toastError, toastSuccess } from "@/utils/methods";

import { CustomInput } from "@/components/CustomInput/CustomInput";
import BasicDropzone from "@/components/Dropzone/BasicDropzone";


export default function CreateFightToken({onClose}){
  const [tokenDescription, setTokenDescription] = useState("")
  const [image, setImage] = useState([])
  const { setIsLoading, isLoading, eventIdSelected } = useNavigationProvider()
  const { data: signer } = useSigner()
  const { events, winners } = useDataProvider()
  const toast = useToast()

  const mintToken = async (fileName) => {
    setIsLoading(true);
    try {
      const winnerAddress = winners.filter(winner => winner.fightId == parseInt(eventIdSelected))[0].winnerAddress
      const NFTmetadata = await storeNFT(image, fileName, tokenDescription)
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, FightContract.abi, signer);
      const transaction = await contract.safeMint(parseInt(eventIdSelected), winnerAddress, NFTmetadata);
      await transaction.wait()

      setIsLoading(false)
      onClose()
      toast(toastSuccess("Mint Fight Token", "Transaction validated"))
    } catch (error) {
      setIsLoading(false)
      toast(toastError("Mint Fight Token", error.message))
    }
  }

  return (
    <Flex direction='column'>
      <Flex>
        <Text fontSize={"xl"} fontWeight={'bold'}> Fighters: </Text>
        <Text fontSize={"xl"} ml={"5"}> {events[eventIdSelected-1].fighterOne}  vs  {events[eventIdSelected-1].fighterTwo} </Text>
      </Flex>
      <Flex>
        <Text fontSize={"xl"} fontWeight={'bold'}> CID: </Text>
        <Text fontSize={"xl"} ml={"5"}> {events[eventIdSelected-1].fileCID} </Text>
      </Flex>

      {/* Use aws s3bucket to preview a picture that we wanna add as an image for the token */}
      {/*
        <Text fontSize={"xl"} fontWeight={'bold'}> Image preview: </Text>
        <Flex direction={"column"} alignItems="center">
          <Image
            objectFit='cover'
            maxW="50%"
            src={events[eventIdSelected-1].fileLink}
            alt='ufc-fighters'
          />
        </Flex> */
      }

      <CustomInput
        isDisabled={isLoading}
        title={"Token description"}
        type="text"
        textHelper={""}
        input={tokenDescription}
        handleInputChange={setTokenDescription}
        isError={tokenDescription.length < 4}
        defaultCase={true}
      />
      <BasicDropzone
        storeNFT={true}
        setImage={setImage}
      />
      <Flex justifyContent={"flex-end"}>
        <Button
          isDisabled={tokenDescription.length < 4 || image.length == 0}
          isLoading={isLoading}
          colorScheme={"red"}
          w={"15vh"}
          h="5vh"
          mt={"5"}
          onClick={() => mintToken(events[eventIdSelected-1].fighterOne + " vs " + events[eventIdSelected-1].fighterTwo)}
        >
          MINT TOKEN
        </Button>
      </Flex>
    </Flex>
  )
}