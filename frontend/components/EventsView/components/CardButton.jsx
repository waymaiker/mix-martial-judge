import { Button, Flex, Text } from '@chakra-ui/react';

export default function CardButton({title, action, secondaryAction, adminBackgroundColor}){
  const onClickAction = action == undefined ? () => {} : () => action()
  const onClickAuxAction = action == undefined ? () => {} : () => secondaryAction()
  const color = adminBackgroundColor == undefined ? "black" :"white" 
  const colorScheme = adminBackgroundColor == undefined ? "" :"red" 
  const backgroundColor = adminBackgroundColor == undefined ? "gray.50" : "red"

  const customOnClick = () => {
    onClickAction() 
    onClickAuxAction()
  }

  return (
    <Button
      mt='1'
      p={"7"}
      justifyContent="center"
      borderColor="gray.400"
      borderRadius="10"
      color={color}
      backgroundColor= {backgroundColor}
      colorScheme={colorScheme}
      onClick={() => customOnClick()}
    >
      <Text m="2" fontWeight="bold"> {title} </Text>
    </Button>
  )
}