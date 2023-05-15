import Head from 'next/head'
import Layout from '@/components/Layout/Layout'

import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';
import { FightProvider } from '@/components/FightView/contexts/fightProvider';

import FightView from '@/components/FightView/FightView';
import RegisterView from '@/components/RegisterView/RegisterView';
import SuperAdminView from '@/components/SuperAdminView/SuperAdminView';
import MarketPlaceView from '@/components/MarketPlaceView/MarketPlaceView';
import CardAddEvent from '@/components/EventsView/components/CardAddEvent';

export default function Home() {
  const { isSuperAdminConnected, isAdminConnected, isGuestUserConnected } = useWhoIsConnectedProvider()
  const { currentPage } = useNavigationProvider()

  return (
    <>
      <Head>
        <title>UFC</title>
        <meta name="description" content="pet project on UFC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        { isSuperAdminConnected && <SuperAdminView /> }
        { isAdminConnected ? <CardAddEvent/> : <></>}
        { isGuestUserConnected && currentPage == "register" && <RegisterView/> }
        { currentPage == "judge" && <FightProvider> <FightView /> </FightProvider> }
        { currentPage == "marketplace" && <MarketPlaceView/> }
      </Layout>
    </>
  )
}