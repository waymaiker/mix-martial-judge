
import { Flex } from '@chakra-ui/react';
import { FaSquare } from 'react-icons/fa';

import styles from '../styles.module.css'

export default function SelectViewMarketPlaceButton ({view, selectView}){
  const gridFor3 = () => {
    return <Flex
      direction='column'
      border="1px"
      borderRight="0px"
      borderColor={view ? "blue.100" : "gray.400"}
      backgroundColor={view ? "blue.100" : "white"}
      borderLeftRadius="20px"
      p="12px"
      pl="18px"
      pr="18px"
      onClick={()=>selectView(true)}
    >
      <Flex>
        <FaSquare color={view ? "white" : "black"} size="12px" />
        <FaSquare color={view ? "white" : "black"} size="12px" />
      </Flex>
      <Flex>
        <FaSquare color={view ? "white" : "black"} size="12px" />
        <FaSquare color={view ? "white" : "black"} size="12px" />
      </Flex>
    </Flex>
  }

  const gridFor5 = () => {
    return <Flex
      direction='column'
      border="1px"
      borderLeft="0px"
      borderColor={!view ? "blue.100" : "gray.400"}
      backgroundColor={!view ? "blue.100" : "white"}
      borderRightRadius="20px"
      p="12px"
      pl="18px"
      pr="18px"
      onClick={()=>selectView(false)}
    >
      <Flex>
        <FaSquare color={!view ? "white" : "black"} size='8px' />
        <FaSquare color={!view ? "white" : "black"} size='8px' />
        <FaSquare color={!view ? "white" : "black"} size='8px' />
      </Flex>
      <Flex>
        <FaSquare color={!view ? "white" : "black"} size='8px' />
        <FaSquare color={!view ? "white" : "black"} size='8px' />
        <FaSquare color={!view ? "white" : "black"} size='8px' />
      </Flex>
      <Flex>
        <FaSquare color={!view ? "white" : "black"} size='8px' />
        <FaSquare color={!view ? "white" : "black"} size='8px' />
        <FaSquare color={!view ? "white" : "black"} size='8px' />
      </Flex>
    </Flex>
  }

  return <Flex className={styles.marketPlaceFilters}>
    {gridFor3()}
    {gridFor5()}
  </Flex>
}