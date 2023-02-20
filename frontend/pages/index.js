import Head from 'next/head'
import Layout from '@/components/Layout/Layout'

import useDataProvider from '@/hooks/useDataProvider';
import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import FightView from '@/components/FightView/FightView';
import EventsView from '@/components/EventsView/EventsView';
import RegisterView from '@/components/RegisterView/RegisterView';
import SuperAdminView from '@/components/SuperAdminView/SuperAdminView';
import { FightProvider } from '@/components/FightView/contexts/fightProvider';

export default function Home() {
  const { isSuperAdminConnected, isAdminConnected } = useWhoIsConnectedProvider()
  const { currentPage } = useNavigationProvider()
  const { events } = useDataProvider()
  const isRegisteredUserConnected = !isSuperAdminConnected && !isAdminConnected

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
        { isRegisteredUserConnected && currentPage == "register" && <RegisterView/> }
        { currentPage == "judge" && <FightProvider> <FightView /> </FightProvider> }
        { currentPage != "judge" && <EventsView events={events}/> }
      </Layout>
    </>
  )
}