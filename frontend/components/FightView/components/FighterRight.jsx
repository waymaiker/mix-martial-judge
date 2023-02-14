import { Flex, Image, Text } from '@chakra-ui/react';

export default function FighterRight({
  headRight, 
  bodyRight, 
  legsRight, 
  setHeadRight, 
  setBodyRight, 
  setLegsRight
}) {
  return (
    <Flex h="55vh" w="38vh" direction="column">
      <Flex justifyContent="center">
        <Text fontWeight="bold" fontSize="2xl" fontStyle="italic"> head: {headRight}</Text>
        <Text fontWeight="bold" fontSize="2xl" fontStyle="italic"  ml="5">body: {bodyRight}</Text>
        <Text fontWeight="bold" fontSize="2xl" fontStyle="italic"  ml="5">legs: {legsRight}</Text>
      </Flex>
      <Image src='/right-head.png' onClick={() => setHeadRight(headRight => headRight +1)} />
      <Image src='/right-body.png' mt="5" onClick={() => setBodyRight(bodyRight => bodyRight +1)} />
      <Image src='/right-legs.png' mt="5" onClick={() => setLegsRight(legsRight => legsRight +1)} />
    </Flex>
  )
}