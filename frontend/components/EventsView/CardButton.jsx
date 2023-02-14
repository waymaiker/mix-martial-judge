import { Flex, Text } from '@chakra-ui/react';

export default function CardButton({title, getMyTicket}){
  const onClickButton = getMyTicket == undefined ? () => {} : () => getMyTicket()
  return (
    <Flex
      mt='1'
      justifyContent="center"
      border="1px"
      borderColor="gray.400"
      borderRadius="l"
      onClick={onClickButton}
    >
      <Text m="2" fontWeight="bold"> {title} </Text>
    </Flex>
  )
}