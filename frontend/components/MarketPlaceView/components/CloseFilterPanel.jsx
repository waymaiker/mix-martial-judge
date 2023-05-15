import { Flex, Text } from '@chakra-ui/react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';

export default function CloseFilterPanel ({showFilterPanel}){
  const line = (width) => <hr
    style={{
      paddingBottom: '1px',
      color: "black",
      backgroundColor: "black",
      height: 1,
      width: width
    }}
  />

  return <Flex
    p="5px"
    pr="10px"
    borderBottom='1px'
    borderColor="gray.300"
    alignItems='center'
    justifyContent='space-between'
    onClick={() => showFilterPanel((isFilterPanelVisible) => !isFilterPanelVisible)}
  >
    <Text fontWeight='extrabold' fontSize="xl" cursor="default"> Filters </Text>
    <Flex alignItems="center">
      <MdOutlineKeyboardArrowLeft />
      <Flex direction="column" ml="-1">
        {line(16)}
        {line(16)}
        {line(16)}
        {line(16)}
        {line(16)}
      </Flex>
    </Flex>
  </Flex>
}