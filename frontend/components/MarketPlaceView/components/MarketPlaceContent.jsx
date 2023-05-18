import { useState } from "react";
import { Flex, Grid, Text } from "@chakra-ui/react";

import ItemMarketPlace from "./ItemMarketPlace";
import {SearchInput} from "./SearchInput";
import SelectViewMarketPlaceButton from "./SelectViewMarketPlaceButton";
import OpenFiltersPanel from "./FiltersPanel/OpenFiltersPanel";

import styles from '../styles.module.css'

export default function MarketPlaceContent({
  items,
  showFilterPanel,
  isFilterPanelVisible,
  borderSearchInputColor,
  setBorderSearchInputColor
}){
  //States
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
          <div onClick={() => setBorderSearchInputColor("gray.300")}>
            {!isFilterPanelVisible && <OpenFiltersPanel showFilterPanel={showFilterPanel}/>}
          </div>
          <SearchInput
            input={inputSearch}
            handleInputChange={setInputSearch}
            borderColor={borderSearchInputColor}
            setColor={setBorderSearchInputColor}
          />
          <div onClick={() => setBorderSearchInputColor("gray.300")}>
            <SelectViewMarketPlaceButton view={view} selectView={selectView} />
          </div>
        </Flex>
        <Text mt='10px' color="gray.600" onClick={() => setBorderSearchInputColor("gray.300")}> {items.length} Collectibles </Text>
        <Grid
          mt='10px'
          className={view ? styles.marketPlaceContentNormal : styles.marketPlaceContentPlus}
          onClick={() => setBorderSearchInputColor("gray.300")}
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