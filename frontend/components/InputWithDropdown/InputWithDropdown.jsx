import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

import { ListDropdown } from './components/ListDropdown'

export const InputWithDropdown = ({isRequired, isDisabled, isError, input, handleInputChange, title}) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel fontSize={"2xl"} color={isError ? 'red' : ""}>{title}</FormLabel>
      <Input
        isDisabled={isDisabled}
        focusBorderColor={isError ? "red.500" : "black"}
        h="6vh"
        size="lg"
        title={title}
        type={'text'}
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {
        input.length > 0
        ? <ListDropdown input={input} setInput={handleInputChange}/>
        : <></>
      }
    </FormControl>
  )
}