import { useState } from "react";
import { Flex, Grid, Text } from "@chakra-ui/react";

import ItemMarketPlace from "./ItemMarketPlace";
import {SearchInput} from "./SearchInput";
import SelectViewMarketPlaceButton from "./SelectViewMarketPlaceButton";
import OpenFiltersPanel from "./FiltersPanel/OpenFiltersPanel";

export default function MarketPlaceContent({items, showFilterPanel, isFilterPanelVisible}){
  const [ view, selectView ] = useState(true)
  const [ inputSearch, setInputSearch ] = useState("")

  return(
    <>
      <Flex
        direction='column'
        p="10px"
        w="70%"
        borderLeft="1px"
        borderColor="gray.200"
      >
        <Flex alignItems="center">
          {!isFilterPanelVisible  && <OpenFiltersPanel showFilterPanel={showFilterPanel} />}
          <SearchInput input={inputSearch} handleInputChange={setInputSearch}/>
          <SelectViewMarketPlaceButton view={view} selectView={selectView} />
        </Flex>
        <Text mt='10px' color="gray.600"> {items.length} Collectibles </Text>
        <Grid
          templateColumns={view ? "repeat(4, 1fr)" : "repeat(5, 1fr)"}
          templateRows={view ? "repeat(5, 1fr)" : "repeat(4, 1fr)"}
          mt='10px'
          minW="100%"
        >
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