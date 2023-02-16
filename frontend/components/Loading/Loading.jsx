import { Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex grow="1" direction={"column"} alignItems="center" justifyContent="center">
      <Spinner size="xl" mb='5'/>
      <Text fontWeight={"extrabold"} fontSize="4xl">Transaction in progress ...</Text>
    </Flex>
  )
}