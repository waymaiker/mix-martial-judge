import { 
  Button, 
  ButtonGroup, 
  Card, 
  CardBody, 
  CardFooter, 
  Divider, 
  Flex, 
  FormControl, 
  FormErrorMessage, 
  FormHelperText, 
  FormLabel, 
  Heading, 
  Image, 
  Input, 
  Stack, 
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

export default function RegisterView() {

  return (
    <Flex grow="1" direction="column" justifyContent='center' alignItems="center">
      <Text color='red' fontWeight="extrabold"> PAGE </Text>
      <Text fontSize="8xl" fontWeight="extrabold" fontStyle="italic">JOIN OUR COMMUNITY</Text>
      <Card w="50%" p="10" shadow={"2xl"}>
        <CardBody>
          <Stack direction={"row"} alignItems='center'>
            <CustomInput title={"Name"} type={"text"} textHelper={"First Name"}/>
            <CustomInput title={"Last Name"} type={"text"} textHelper={"Last Name"}/>
          </Stack>
          <Stack direction={"row"} alignItems='center' mt={"10"}>
            <CustomInput title={"Email"} type="email" textHelper={"example@example.com"}/>
            <CustomInput title={"Country"} type="text" textHelper={"USA"}/>
          </Stack>
          <Stack direction={"row"} alignItems='center' mt={"10"}>
            <CustomInput title={"Postal Code"} type="number" textHelper={"75001"}/>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter justifyContent="center">
          <Button p={"8"} w="25vh" fontSize={"2xl"} variant='solid' colorScheme='red'>
            SUBMIT
          </Button>        
        </CardFooter>
      </Card>
    </Flex>    
  )
}

const CustomInput = ({title, type, textHelper}) => {
  const [input, setInput] = useState('')
  const handleInputChange = (e) => setInput(e.target.value)
  const isError = input === ""

  return (
    <FormControl isInvalid={isError}>
      <FormLabel fontSize={"2xl"}>{title}</FormLabel>
      <Input h="6vh" title={title} type={type} value={input} onChange={handleInputChange} />      
      
      {!isError ? (
        <FormHelperText>
          {textHelper}
        </FormHelperText>
      ) : (
        <FormErrorMessage>{title} is required.</FormErrorMessage>
      )}
    </FormControl>
  )
}