import { useState } from 'react';
import Head from 'next/head'
import { Flex, Image, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from '@chakra-ui/react';

import MarketPlaceContent from './components/MarketPlaceContent';
import CloseFilterPanel from './components/CloseFilterPanel';

export default function MarketPlaceView() {
  const [ isFilterPanelVisible, showFilterPanel ] = useState(true)
  const [ startPrice, onChangePrice ] = useState(0)


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
        <Flex justifyContent="center">
          {
            isFilterPanelVisible
            && <Flex
                direction='column'
                w="15%"
                mr='7px'
                p="10px"
                pr="0px"
                borderRight="1px"
                borderColor="gray.300"
              >
                <CloseFilterPanel showFilterPanel={showFilterPanel} />
                <Flex direction='column' p="5px">
                  <Text fontSize="md" cursor="default" mt="10px"> Price </Text>
                  <Flex>
                    <Text fontSize="xs" cursor="default" mr="5"> Start: {startPrice.toString().slice(0,startPrice.toString().length/2).replace(',', '')} </Text>
                    <Text fontSize="xs" cursor="default"> End: {startPrice.toString().slice(startPrice.toString().length/2, startPrice.toString().length).replace(',', '')}</Text>
                  </Flex>
                  <RangeSlider
                    aria-label={['min', 'max']}
                    min={0}
                    max={100}
                    defaultValue={[10, 50]}
                    onChange={(val, val2) => onChangePrice(val)}
                  >
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                </Flex>
              </Flex>
          }
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