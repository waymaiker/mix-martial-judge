import Head from 'next/head'
import { useState } from 'react';
import { Flex, Grid, Image } from '@chakra-ui/react';

import MarketPlaceContent from './components/MarketPlaceContent';
import FiltersPanelView from './components/FiltersPanel/FiltersPanelView';

import styles from './styles.module.css'

export default function MarketPlaceView() {
  //State
  const [ isFilterPanelVisible, showFilterPanel ] = useState(true)
  const [ borderSearchInputColor, setBorderSearchInputColor ] = useState("gray.300")

  const items = [
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
    {
      'title': 'UFC 286: Grasso vs Araujo',
      'nftImage': '/israel-adesanya.jpeg',
      'price': '5$',
      'nbForSale': 200
    },
  ]

  return (
    <>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Marketplace of UFC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex direction='column'>
        <Image
          fit="fit"
          src="/arena.png"
          shadow="2xl"
          onClick={() => setBorderSearchInputColor("gray.300")}
        />
        <Grid mt='10px' p="5px" className={isFilterPanelVisible ? styles.marketPlaceView : ""}>
          {isFilterPanelVisible &&
            <FiltersPanelView
              showFilterPanel={showFilterPanel}
              setBorderSearchInputColor={setBorderSearchInputColor}
            />
          }
          <MarketPlaceContent
            items={items}
            showFilterPanel={showFilterPanel}
            isFilterPanelVisible={isFilterPanelVisible}
            borderSearchInputColor={borderSearchInputColor}
            setBorderSearchInputColor={setBorderSearchInputColor}
          />
        </Grid>
      </Flex>
    </>
  )
}