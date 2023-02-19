import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export const CustomInput = ({title, type, textHelper, input, handleInputChange, isError, isDisabled, defaultCase}) => {

  return (
    <FormControl isInvalid={isError}>
      <FormLabel fontSize={"2xl"} color={isError ? 'red' : ""}>{title}</FormLabel>
      <Input
        isDisabled={isDisabled}
        h="6vh"
        title={title}
        type={type}
        value={input}
        size="lg"
        onChange={defaultCase ? (e) => handleInputChange(e.target.value) : (e) => handleInputChange(e.target.value.toUpperCase())}
      />
      {!isError ? (
        <FormHelperText>
          {textHelper}
        </FormHelperText>
      ) : (
        <FormErrorMessage>{title} is required | {textHelper} </FormErrorMessage>
      )}
    </FormControl>
  )
}