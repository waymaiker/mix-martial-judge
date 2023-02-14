import { Flex, Image, Text } from '@chakra-ui/react';

export default function LeftFighter({
  headLeft, 
  bodyLeft, 
  legsLeft, 
  setHeadLeft, 
  setBodyLeft, 
  setLegsLeft
}) {
  return (
    <Flex h="55vh" w="38vh" direction="column">
      <Flex justifyContent="center">
        <Text fontWeight="bold" fontSize="2xl" fontStyle="italic">head: {headLeft}</Text>
        <Text fontWeight="bold" fontSize="2xl" fontStyle="italic" ml="5">body: {bodyLeft}</Text>
        <Text fontWeight="bold" fontSize="2xl" fontStyle="italic" ml="5">legs: {legsLeft}</Text>
      </Flex>
      <Image src='/left-head.png' onClick={() => setHeadLeft(headLeft => headLeft+1)} />
      <Image src='/left-body.png' mt="5" onClick={() => setBodyLeft(bodyLeft => bodyLeft+1)} />
      <Image src='/left-legs.png' mt="5" onClick={() => setLegsLeft(legsLeft => legsLeft+1)} />
    </Flex>
  )
}