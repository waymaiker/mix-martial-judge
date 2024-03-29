import { Flex } from '@chakra-ui/react';

import CloseFilterPanel from './CloseFilterPanel';
import PriceFilter from './PriceFilter';

import styles from '../../styles.module.css'

export default function FiltersPanelView ({showFilterPanel, setBorderSearchInputColor}){
  return <Flex
    direction='column'
    mr="12px"
    p="10px"
    pr="0px"
    borderRight="1px"
    borderColor="gray.200"
    className={styles.marketPlaceFilters}
    onClick={() => setBorderSearchInputColor("gray.300")}
  >
    <CloseFilterPanel showFilterPanel={showFilterPanel} />
    <PriceFilter />
  </Flex>
}