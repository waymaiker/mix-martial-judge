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
import { AnimationContentFadeIn } from '@/utils/animations';

import { CustomInput } from '../CustomInput/CustomInput';
import { InputWithDropdown } from '../InputWithDropdown/InputWithDropdown';

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
  const { setIsLoading, isLoading, setCurrentPage } = useNavigationProvider()

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
        addFirstUserFirebase(address, pseudo, lastname, email, country, dateToTimeStamp(dob))
      } else {
        addUserFirebase(address, pseudo, lastname, email, country, dateToTimeStamp(dob))
      }

      setCurrentUser({address: address, pseudo: pseudo, email:email, bookedEvents:[]})
      setIsLoading(false)
      toast(toastSuccess("UserCreated", "Transaction validated"))
    } catch (error) {
      setIsLoading(false)
      toast(toastError("UserCreated", error.message))
    }
  }

  return (
    <Flex id='register' grow="1" direction="column" justifyContent='center' alignItems="center"  backgroundColor={"red.600"} pb={"20"}>
      <Text fontWeight="extrabold" mt="2%"> PAGE </Text>
      <AnimationContentFadeIn>
        <Text fontSize="8xl" fontWeight="extrabold" fontStyle="italic" color={"white"}>JOIN OUR COMMUNITY</Text>
      </AnimationContentFadeIn>
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
              textHelper={!isUserAtLeast18YearsOld(dob) ?  "You should at least have 18 yo" : ""}
              input={dob}
              handleInputChange={setDob}
              isError={!isUserAtLeast18YearsOld(dob)}
            />
            <CustomInput
              isDisabled={isLoading}
              title={"Email"}
              type="email"
              textHelper={isEmail(email) ? "example@example.com" : ""}
              input={email}
              handleInputChange={setEmail}
              isError={isEmail(email)}
              defaultCase={true}
            />
          </Stack>
          <Stack direction={"row"} alignItems='center' mt={"10"}>
            <InputWithDropdown
              isDisabled={isLoading}
              title={"Country"}
              input={country}
              textHelper={!isCountry(country) ? "This country does not exist" : ""}
              handleInputChange={setCountry}
              isError={!isCountry(country)}
            />
            <CustomInput
              isDisabled={isLoading}
              title={"Area Code"}
              type="number"
              textHelper={postalCode.toString().length > 0 ? "" : "example: 75001"}
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