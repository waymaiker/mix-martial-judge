import { Flex, Text } from '@chakra-ui/react';

import styles from '../../styles.module.css'

export default function OpenFiltersPanel ({showFilterPanel}){
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
    alignItems="center"
    border="1px"
    borderColor="blackAlpha.500"
    backgroundColor="white"
    borderRadius="20px"
    pl="15px"
    pr="15px"
    mr='5px'
    onClick={() => showFilterPanel((isFilterPanelVisible) => !isFilterPanelVisible)}
    className={styles.marketPlaceFilters}
  >
    <Flex direction="column" alignItems='center'>
      {line(16)}
      {line(12)}
      {line(8)}
      {line(4)}
    </Flex>
    <Text fontWeight='extrabold' p='5px' mt='1' fontSize="xl"> Filters </Text>
  </Flex>
}