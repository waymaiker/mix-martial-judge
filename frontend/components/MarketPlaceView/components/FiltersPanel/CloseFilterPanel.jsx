import { Flex, Text } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { TfiAlignJustify } from 'react-icons/tfi';

import styles from './styles.module.css'

export default function CloseFilterPanel ({showFilterPanel}){
  return <Flex
    p="5px"
    pr="10px"
    borderBottom='1px'
    borderColor="gray.200"
    alignItems='center'
    justifyContent='space-between'
    onClick={() => showFilterPanel((isFilterPanelVisible) => !isFilterPanelVisible)}
    className={styles.filterPanelItem}
  >
    <Text fontWeight='extrabold' fontSize="xl" cursor="default"> Filters </Text>
    <Flex alignItems="center">
      <MdOutlineKeyboardArrowLeft />
      <TfiAlignJustify />
    </Flex>
  </Flex>
}