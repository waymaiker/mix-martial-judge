import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export const CustomInput = ({title, type, textHelper, completeCustomTextHelper, input, handleInputChange, isError, isDisabled, defaultCase}) => {
  const showCustomTextHelper = completeCustomTextHelper
    ? <FormErrorMessage>{completeCustomTextHelper}</FormErrorMessage>
    : <FormErrorMessage>{title} is required</FormErrorMessage>

  return (
    <FormControl isInvalid={isError}>
      <FormLabel fontSize={"2xl"} color={isError ? 'red' : ""}>{title}</FormLabel>
      <Input
        isDisabled={isDisabled}
        focusBorderColor={isError ? "red.500" : "black"}
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
        textHelper
          ? <FormErrorMessage>{title} is required | {textHelper} </FormErrorMessage>
          : showCustomTextHelper
      )}
    </FormControl>
  )
}