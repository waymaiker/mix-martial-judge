import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useSigner } from 'wagmi';
import { Button, Card, CardBody, CardFooter, Divider, Flex, Stack, Text, useToast } from '@chakra-ui/react';

import UserFactoryContract from '../../contracts/UserFactory.json';

import { addFirstUserFirebase, addUserFirebase } from '@/services/firestore_services';

import useDataProvider from '@/hooks/useDataProvider';
import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import { dateToTimeStamp, isEmail, isUserAtLeast18YearsOld, toastError, toastSuccess } from '@/utils/methods';
import { isCountry } from '@/utils/cities';

import { CustomInput } from '../CustomInput/CustomInput';

export default function RegisterView() {
  const [dob, setDob] = useState("")
  const [email, setEmail] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [country, setCountry] = useState("")
  const [lastname, setLastname] = useState("")
  const [postalCode, setPostalCode] = useState(0)

  const toast = useToast()
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { getData, users } = useDataProvider()
  const { isRegisteredUserConnected, setCurrentUser } = useWhoIsConnectedProvider()
  const { setIsLoading, isLoading, setCurrentPage, eventIdSelected } = useNavigationProvider()

  const isPseudoExist = (val) => {
    return users.filter(user => user.pseudo.toLowerCase() == val.toLowerCase()).length > 0
  }

  const PseudoHelper = () => {
    return <>
      { pseudo.length < 2 ? "2 letters minimum" : "" }
      { isPseudoExist(pseudo) ? "This pseudo is already used" : ""}
    </>
  }

  const isError = !isPseudoExist(pseudo)
    && pseudo.length >= 2
    && !isEmail(email)
    && country.length > 3
    && lastname.length >= 2
    && isUserAtLeast18YearsOld(dob)
    && postalCode.toString().length > 4

  const submit = async () => {
    setIsLoading(true);
    try {
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_USERFACTORY_SCADDRESS_LOCALHOST, UserFactoryContract.abi, signer);
      const transaction = await contract.create(pseudo);
      await transaction.wait()

      await getData()

      if(!isRegisteredUserConnected){
        addFirstUserFirebase(address, pseudo, lastname, email, country, dateToTimeStamp(dob), parseInt(eventIdSelected))
      } else {
        addUserFirebase(address, pseudo, lastname, email, country, dateToTimeStamp(dob), parseInt(eventIdSelected))
      }

      setCurrentUser({address: address, pseudo: pseudo, email:email, registeredEvents:[parseInt(eventIdSelected)]})
      setIsLoading(false)
      toast(toastSuccess("UserCreated", "Transaction validated"))
    } catch (error) {
      setIsLoading(false)
      toast(toastError("UserCreated", error.message))
    }
  }

  return (
    <Flex grow="1" direction="column" justifyContent='center' alignItems="center"  backgroundColor={"red.600"} pb={"20"}>
      <Text fontWeight="extrabold" mt="2%"> PAGE </Text>
      <Text fontSize="8xl" fontWeight="extrabold" fontStyle="italic" color={"white"}>JOIN OUR COMMUNITY</Text>
      <Card w="50%" p="10" shadow={"2xl"}>
        <CardBody>
          <Stack direction={"row"} alignItems='center'>
            <CustomInput
              isDisabled={isLoading}
              title={"Pseudo"}
              type={"text"}
              completeCustomTextHelper={PseudoHelper()}
              input={pseudo}
              handleInputChange={setPseudo}
              isError={isPseudoExist(pseudo) || pseudo.length < 2}
            />
            <CustomInput
              isDisabled={isLoading}
              title={"Last Name"}
              type={"text"}
              textHelper={lastname.length < 2 ? "2 letters minimum" : ""}
              input={lastname}
              handleInputChange={setLastname}
              isError={lastname.length < 2}
            />
          </Stack>
          <Stack direction={"row"} alignItems='center' mt={"10"}>
            <CustomInput
              isDisabled={isLoading}
              title={"DOB"}
              type="date"
              textHelper={"You should at least have 18 yo"}
              input={dob}
              handleInputChange={setDob}
              isError={!isUserAtLeast18YearsOld(dob)}
            />
            <CustomInput
              isDisabled={isLoading}
              title={"Email"}
              type="email"
              textHelper={"example@example.com"}
              input={email}
              handleInputChange={setEmail}
              isError={isEmail(email)}
              defaultCase={true}
            />
          </Stack>
          <Stack direction={"row"} alignItems='center' mt={"10"}>
            <CustomInput
              isDisabled={isLoading}
              title={"Country"}
              type="text"
              input={country}
              textHelper={!isCountry(country) ? "This country does not exist" : ""}
              handleInputChange={setCountry}
              isError={!isCountry(country)}
              defaultCase={true}
            />
            <CustomInput
              isDisabled={isLoading}
              title={"Postal Code / Zip Code"}
              type="number"
              textHelper={"75001"}
              input={postalCode}
              handleInputChange={setPostalCode}
              isError={postalCode.toString().length < 5}
            />
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent="center">
          <Button
            isLoading={isLoading}
            isDisabled={!isError}
            p={"8"} w="25vh"
            fontSize={"2xl"}
            variant='solid'
            colorScheme='red'
            onClick={() =>{ submit(); setCurrentPage('')}}
          >
            SUBMIT
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  )
}