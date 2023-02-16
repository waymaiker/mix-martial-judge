import { Button, Flex, Text } from '@chakra-ui/react';

export default function CardButton({title, action, secondaryAction}){
  const onClickAction = action == undefined ? () => {} : () => action()

  return (
    <Button
      mt='1'
      p={"7"}
      justifyContent="center"
      borderColor="gray.400"
      borderRadius="10"
      backgroundColor="gray.50"
      onClick={onClickAction}
    >
      <Text m="2" fontWeight="bold"> {title} </Text>
    </Button>
  )
}