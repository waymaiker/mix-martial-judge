import { Flex, Text } from "@chakra-ui/react";

export default function NoticePopupContent(){
  return (
    <Flex direction={'column'} h={'45vh'} w={'70vh'}>
      <Text fontSize={"xl"} fontWeight={"bold"} mb={"10px"}> 1 - Context </Text>
      <Text fontSize={"xl"}> This fight will have several round. </Text>
      <Text fontSize={"xl"}> Each round will last 5 min. </Text>
      <Text fontSize={"xl"} mb={"10px"}> You will be able to count each hit received by each fighter. </Text>

      <Text fontSize={"xl"} fontWeight={"bold"} mb={"10px"}> 2 - During the Fight </Text>
      <Text fontSize={"xl"} mb={"10px"}> You will submit your round's result. </Text>

      <Text fontSize={"xl"} fontWeight={"bold"} mb={"10px"}> 3 - At the of the Fight </Text>
      <Text fontSize={"xl"} mb={"10px"}>
        You will submit the fighter who won based on your observation,
        and the number of hits received on each body parts, by each fighter.
      </Text>

      <Text fontSize={"xl"} fontWeight={"bold"} mb={"10px"} color={'red.500'}> IMPORTANT </Text>
      <Text fontSize={"xl"}> You cant modify submitted data </Text>
    </Flex>
  )
}