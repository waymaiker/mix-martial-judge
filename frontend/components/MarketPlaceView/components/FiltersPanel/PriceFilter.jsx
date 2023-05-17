import { useState } from 'react';
import { Flex, Input, Text } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

import styles from './styles.module.css'

export default function PriceFilter ({}){
  const [ input, handleInputChange ] = useState()
  const [ visibility, visibilityChange ] = useState()

  return <Flex direction='column'>
    <Flex
      p="5px"
      alignItems="center"
      justifyContent="space-between"
      borderBottom={visibility ? "0px" : "1px"}
      borderColor="gray.200"
      className={styles.filterPanelItem}
      onClick={()=>visibilityChange(!visibility)}
    >
      <Text cursor="default" fontSize="18"> Price </Text>
      {visibility ? <MdOutlineKeyboardArrowUp size="25px"/> : <MdOutlineKeyboardArrowDown size="25px"/>}
    </Flex>
    {
      visibility
      ? <Flex p="10px" alignItems='center' justifyContent="space-between" borderBottom="1px" borderColor="gray.200">
          <Text mr="5px" fontWeight='bold' fontSize="lg" cursor="default"> $ </Text>
          <Input
            placeholder='Minimum'
            h="5vh"
            mr="5px"
            title='start'
            type='text'
            value={input}
            size="md"
            onChange={(e) => handleInputChange(e.target.value)}
          />
          -
          <Input
            placeholder='Maximum'
            h="5vh"
            ml="5px"
            title='end'
            type='text'
            value={input}
            size="md"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </Flex>
      : <></>
    }
  </Flex>
}