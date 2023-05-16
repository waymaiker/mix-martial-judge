import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export const SearchInput = ({title, input, handleInputChange}) => {
  return (
    <Flex w="100%" mr="5px">
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <FaSearch />
        </InputLeftElement>
        <Input
          type='text'
          title={title}
          placeholder='Search by name or by description'
          value={input}
          size='lg'
          h="4vh"
          borderRadius="20px"
          borderColor="blackAlpha.500"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </InputGroup>
    </Flex>
  )
}