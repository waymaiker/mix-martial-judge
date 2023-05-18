import { useState } from "react";
import { Flex, Grid, Text } from "@chakra-ui/react";

import ItemMarketPlace from "./ItemMarketPlace";
import {SearchInput} from "./SearchInput";
import SelectViewMarketPlaceButton from "./SelectViewMarketPlaceButton";
import OpenFiltersPanel from "./FiltersPanel/OpenFiltersPanel";

import styles from '../styles.module.css'

export default function MarketPlaceContent({items, showFilterPanel, isFilterPanelVisible}){
  const [ view, selectView ] = useState(true)
  const [ inputSearch, setInputSearch ] = useState("")

  return(
    <>
      <Flex
        direction='column'
        padding="10px"
        borderLeft="1px"
        borderColor="gray.200"
      >
        <Flex alignItems="center">
          {!isFilterPanelVisible && <OpenFiltersPanel showFilterPanel={showFilterPanel}/>}
          <SearchInput input={inputSearch} handleInputChange={setInputSearch}/>
          <SelectViewMarketPlaceButton view={view} selectView={selectView} />
        </Flex>
        <Text mt='10px' color="gray.600"> {items.length} Collectibles </Text>
        <Grid mt='10px' className={view ? styles.marketPlaceContentNormal : styles.marketPlaceContentPlus}>
          {
            items.map((item, index) =>
              <ItemMarketPlace
                key={index}
                title={item.title}
                nftImage={item.nftImage}
                price={item.price}
                nbForSale={200}
                typeOfview={view}
              />
            )
          }
        </Grid>
      </Flex>
    </>
  )
}