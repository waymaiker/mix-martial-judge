import { Flex } from '@chakra-ui/react';

import CloseFilterPanel from './CloseFilterPanel';
import PriceFilter from './PriceFilter';

export default function FiltersPanelView ({showFilterPanel}){
  return <Flex
    direction='column'
    w="15%"
    mr="7px"
    p="10px"
    pr="0px"
    borderRight="1px"
    borderColor="gray.300"
  >
    <CloseFilterPanel showFilterPanel={showFilterPanel} />
    <PriceFilter />
  </Flex>
}