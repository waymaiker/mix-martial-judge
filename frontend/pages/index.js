import Head from 'next/head'
import Layout from '@/components/Layout/Layout'

import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import FightView from '@/components/FightView/FightView';
import RegisterView from '@/components/RegisterView/RegisterView';
import SuperAdminView from '@/components/SuperAdminView/SuperAdminView';
import { FightProvider } from '@/components/FightView/contexts/fightProvider';

export default function Home() {
  const { isSuperAdminConnected, isGuestUserConnected } = useWhoIsConnectedProvider()
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
        { isGuestUserConnected && currentPage == "register" && <RegisterView/> }
        { currentPage == "judge" && <FightProvider> <FightView /> </FightProvider> }
      </Layout>
    </>
  )
}