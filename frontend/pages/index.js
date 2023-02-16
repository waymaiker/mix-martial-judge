import Head from 'next/head'
import Layout from '@/components/Layout/Layout'

import useNavigationProvider from '@/hooks/useNavigationProvider';
import { FightProvider } from '@/components/FightView/contexts/fightProvider';

import EventsView from '@/components/EventsView/EventsView';
import FightView from '@/components/FightView/FightView';
import RegisterView from '@/components/RegisterView/RegisterView';
import useDataProvider from '@/hooks/useDataProvider';

export default function Home() {
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
        <EventsView events={events}/>
        { currentPage == "register" && <RegisterView/> }
        {/* { currentPage == "events" && <EventsView events={events}/> }
        { currentPage == "judge" && <FightProvider> <FightView /> </FightProvider> } */}
      </Layout>
    </>
  )
}