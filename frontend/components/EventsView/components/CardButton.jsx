import { Button, Text } from '@chakra-ui/react';

export default function CardButton({title, action, secondaryAction, adminBackgroundColor, isDisabled, isLoading, customPadding, customWidth}){
  const onClickAction = action == undefined ? () => {} : () => action()
  const onClickAuxAction = secondaryAction == undefined ? () => {} : () => secondaryAction()
  const color = adminBackgroundColor == undefined ? "black" :"white"
  const colorScheme = adminBackgroundColor == undefined ? "" :"red"
  const backgroundColor = adminBackgroundColor == undefined ? "gray.200" : "red"
  const padding = customPadding == undefined ? 7 : customPadding
  const width = customWidth == undefined ? "auto" : customWidth

  const customOnClick = () => {
    onClickAction(),
    onClickAuxAction()
  }

  return (
    <Button
      mt='1'
      p={padding}
      w={width}
      isDisabled={isDisabled}
      isLoading={isLoading}
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