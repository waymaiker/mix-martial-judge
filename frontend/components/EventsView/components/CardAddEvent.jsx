import { useState } from 'react';
import { useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { Button, Flex, FormControl, Image, Stack, Switch, Text, useToast } from '@chakra-ui/react';

import FightContract from '../../../contracts/Fight.json';

import useNavigationProvider from '@/hooks/useNavigationProvider';
import useDataProvider from '@/hooks/useDataProvider';

import { toastError, toastSuccess } from '@/utils/methods';

import { CustomInput } from '../../CustomInput/CustomInput';
import BasicDropzone from '../../Dropzone/BasicDropzone';

export default function CardAddEvent() {
  const [arena, setArena] = useState("")
  const [location, setLocation] = useState("")
  const [fightType, setFightType] = useState(1)
  const [fighterOne, setFighterOne] = useState("")
  const [fighterTwo, setFighterTwo] = useState("")
  const [fileData, setFileData] = useState({"CID":"", "Link":""})

  const { getData } = useDataProvider()
  const { setIsLoading, isLoading } = useNavigationProvider()
  const { data: signer } = useSigner()
  const toast = useToast()

  const isError =
    fighterOne.toString().length < 3
    || fighterTwo.toString().length < 3
    || arena.toString().length < 4
    || location.toString().length < 4
    || fileData.Link.length == 0


  const resetState = () => {
    setArena("")
    setLocation("")
    setFightType(0)
    setFighterOne("")
    setFighterTwo("")
    setFileData({"CID":"", "Link":""})
  }

  const submit = async () => {
    setIsLoading(true);
    try {
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, FightContract.abi, signer);
      const transaction = await contract.createFight(fighterOne, fighterTwo, arena, location, fightType, fileData.Link, fileData.CID);
      await transaction.wait()

      await getData()
      resetState()
      setIsLoading(false)
      toast(toastSuccess("EventCreated", "Transaction validated"))
    } catch (error) {
      setIsLoading(false)
      toast(toastError("EventCreated", error.message))
    }
  }

  return (
    <Flex direction={"column"} alignItems="center" backgroundColor={"red.600"} shadow={"xl"} mb={"10"}>
      <Text fontWeight="extrabold" mt="2%"> PAGE </Text>
      <Text fontWeight="bold" fontSize="7xl" fontStyle="italic" color={"white"}>  CREATE AN EVENT</Text>
      <Stack direction='column' alignItems={"center"} shadow={"xl"} backgroundColor={"white"} borderRadius="10" w="100vh" p="20" mt="5" mb="20" >
        <Flex direction={"row"} w="75%" mb={"10"} alignItems={"center"} justifyContent="space-around">
          <Image
            src={"/regular.png"}
            alt='ufc'
          />
          <Switch size='lg' value={fightType} onChange={(e) => setFightType(e.target.checked)} />
          <Image
            src={"/championship.png"}
            alt='ufc'
          />
        </Flex>
        <Stack direction={"row"}>
          <CustomInput
            isDisabled={isLoading}
            title={"Fighter 1"}
            type="text"
            textHelper={""}
            input={fighterOne}
            handleInputChange={setFighterOne}
            isError={fighterOne.toString().length < 3}
          />
          <CustomInput
            isDisabled={isLoading}
            title={"Fighter 2"}
            type="text"
            textHelper={""}
            input={fighterTwo}
            handleInputChange={setFighterTwo}
            isError={fighterTwo.toString().length < 3}
          />
          <CustomInput
            isDisabled={isLoading}
            title={"Arena"}
            type="text"
            textHelper={""}
            input={arena}
            handleInputChange={setArena}
            isError={arena.toString().length < 4}
          />
          <CustomInput
            isDisabled={isLoading}
            title={"Location"}
            type="text"
            textHelper={""}
            input={location}
            handleInputChange={setLocation}
            isError={location.toString().length < 4}
          />
          <FormControl>
            <Button
              isLoading={isLoading}
              isDisabled={isError}
              fontSize="xl"
              colorScheme='red'
              onClick={() => submit()}
              position="relative"
              top={isError ? "30%" : "33%"}
              w={"18vh"}
              h="6vh"
            >
              SUBMIT
            </Button>
          </FormControl>
        </Stack>
        <BasicDropzone setFileData={setFileData} />
      </Stack>
    </Flex>
  )
}