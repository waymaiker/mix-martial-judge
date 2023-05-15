import { Flex, Text } from '@chakra-ui/react';
import Head from 'next/head'
import Layout from '@/components/Layout/Layout'

import useNavigationProvider from '@/hooks/useNavigationProvider';

export default function MarketPlaceView() {
  const { currentPage } = useNavigationProvider()

  return (
    <>
      <Head>
        <title>Marketplace</title>
        <meta name="description" content="Marketplace of UFC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex grow={1} alignItems={"center"} justifyContent={"center"}>
          <Text> MARKET PLACE </Text>
        </Flex>
      </Layout>
    </>
  )
}