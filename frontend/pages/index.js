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
  const { isSuperAdminConnected } = useWhoIsConnectedProvider()
  const { currentPage } = useNavigationProvider()
  const { events } = useDataProvider()

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
        { currentPage == "register" && <RegisterView/> }
        {/* { currentPage == "events" && <EventsView events={events}/> }
        { currentPage == "judge" && <FightProvider> <FightView /> </FightProvider> } */}
        <EventsView events={events}/>
      </Layout>
    </>
  )
}