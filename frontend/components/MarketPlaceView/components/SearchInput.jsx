import { Flex, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

export const SearchInput = ({title, input, handleInputChange, setColor, borderColor}) => {
  const isInputEmpty = input.length == 0 && input == "";

  return (
    <Flex
      w="100%"
      mr="5px"
      p="2px"
      pl="10px"
      pr="10px"
      alignItems="center"
      border="1px"
      borderRadius="20px"
      borderColor={borderColor}
    >
      <FaSearch />
      <InputGroup>
        <Input
          type='text'
          title={title}
          placeholder='Search by name or by description'
          value={input}
          size='lg'
          h="4vh"
          focusBorderColor="whiteAlpha.100"
          border="0xp"
          onClick={() => setColor("blue.500")}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </InputGroup>
      {
        isInputEmpty
          ? <></>
          : <RxCross1 onClick={() => {handleInputChange(""), setColor("gray.300")}}/>
      }
    </Flex>
  )
}