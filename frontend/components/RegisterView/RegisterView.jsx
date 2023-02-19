import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSigner } from 'wagmi';

import useNavigationProvider from '@/hooks/useNavigationProvider';

import { Button, Card, CardBody, CardFooter, Divider, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { CustomInput } from '../CustomInput/CustomInput';

import { dateToTimeStamp, isCountry, isEmail, toastError, toastSuccess } from '@/utils/methods';
import { userFactoryContract } from '@/utils/constants';
import Loading from '../Loading/Loading';

export default function RegisterView() {
  const [dob, setDob] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("")
  const [lastname, setLastname] = useState("")
  const [postalCode, setPostalCode] = useState(0)

  const toast = useToast()
  const { data: signer } = useSigner()
  const { setIsLoading, isLoading, setCurrentPage } = useNavigationProvider()

  const isError = name.length >= 2
    && lastname.length >= 2
    && !isEmail(email)
    && country.length > 3
    && postalCode.toString().length > 4

  const submit = async () => {
    setIsLoading(true);
    try {
      const contract = new ethers.Contract(userFactoryContract.address, userFactoryContract.abi, signer);
      const transaction = await contract.create(name, lastname, email, country, dateToTimeStamp(dob),  {value: 5100000000000 });
      await transaction.wait()    
      
      setIsLoading(false)
      toast(toastSuccess("UserCreated", "Transaction validated"))    
    } catch (error) {
      setIsLoading(false)
      toast(toastError("UserCreated", error.message))
    }
  }

  useEffect(()=>{}, [isLoading])

  return (
    isLoading
    ? <Loading />
    : <Flex grow="1" direction="column" justifyContent='center' alignItems="center">
        <Text color='red' fontWeight="extrabold" mt="2%"> PAGE </Text>
        <Text fontSize="8xl" fontWeight="extrabold" fontStyle="italic">JOIN OUR COMMUNITY</Text>
        <Card w="50%" p="10" shadow={"2xl"}>
          <CardBody>
            <Stack direction={"row"} alignItems='center'>
              <CustomInput
                isDisabled={isLoading}
                title={"Name"}
                type={"text"}
                textHelper={name.length < 2 ? "2 letters minimum" : ""}
                input={name}
                handleInputChange={setName}
                isError={name.length < 2}
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
                textHelper={"mm/dd/yyyy"}
                input={dob}
                handleInputChange={setDob}
                isError={dob == 0}
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