import { Flex } from "@chakra-ui/react"

export const DropdownItem = ({index, last, text, setInput, closeDropdownList}) => {
  return (
    <Flex
      id={index}
      borderBottom={'1px'}
      borderColor={'gray.200'}
      borderBottomRadius={last ? '6px' : '0px'}
      p={'2px'}
      onClick={() => {setInput(text), closeDropdownList([])}}
    >
      {text}
    </Flex>
  )
}
