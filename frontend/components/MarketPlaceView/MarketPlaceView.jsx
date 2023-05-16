import Head from 'next/head'
import { useState } from 'react';
import { Flex, Image } from '@chakra-ui/react';

import MarketPlaceContent from './components/MarketPlaceContent';
import FiltersPanelView from './components/FiltersPanel/FiltersPanelView';

export default function MarketPlaceView() {
  const [ isFilterPanelVisible, showFilterPanel ] = useState(true)

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
          shadow={"2xl"}
        />
        <Flex justifyContent="center" p="10px">
          { isFilterPanelVisible && <FiltersPanelView showFilterPanel={showFilterPanel}/> }
          <MarketPlaceContent
            items={items}
            showFilterPanel={showFilterPanel}
            isFilterPanelVisible={isFilterPanelVisible}
          />
        </Flex>
      </Flex>
    </>
  )
}