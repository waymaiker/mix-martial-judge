import Head from 'next/head'
import Layout from '@/components/Layout/Layout'

import useNavigationProvider from '@/hooks/useNavigationProvider';
import { FightProvider } from '@/components/FightView/contexts/fightProvider';

import EventsView from '@/components/EventsView/EventsView';
import FightView from '@/components/FightView/FightView';
import RegisterView from '@/components/RegisterView/RegisterView';


export default function Home() {
  const { currentPage } = useNavigationProvider()

  const events = [
    {
      fightType: "regular",
      fightersImage: "capvsron",
      title: "CARPENTIER VS RONDEROS",
      arena: "UFC APEX",
      location: "Las Vegas, NV États-Unis",
    },
    {
      fightType: "championship",
      fightersImage: "jonesvsgane",
      title: "JONES VS GANE",
      arena: "T-Mobile Arena",
      location: "Las Vegas, NV États-Unis",
    },
    {
      fightType: "regular",
      fightersImage: "capvsron",
      title: "CARPENTIER VS RONDEROS",
      arena: "UFC APEX",
      location: "Las Vegas, NV États-Unis",
    },
    {
      fightType: "championship",
      fightersImage: "jonesvsgane",
      title: "JONES VS GANE",
      arena: "T-Mobile Arena",
      location: "Las Vegas, NV États-Unis",
    },
    {
      fightType: "regular",
      fightersImage: "capvsron",
      title: "CARPENTIER VS RONDEROS",
      arena: "UFC APEX",
      location: "Las Vegas, NV États-Unis",
    },
    {
      fightType: "championship",
      fightersImage: "jonesvsgane",
      title: "JONES VS GANE",
      arena: "T-Mobile Arena",
      location: "Las Vegas, NV États-Unis",
    },
  ];

  return (
    <>
      <Head>
        <title>UFC</title>
        <meta name="description" content="pet project on UFC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        { currentPage == "events" && <EventsView events={events}/> }
        { currentPage == "register" && <RegisterView/> }
        { currentPage == "judge" && <FightProvider> <FightView /> </FightProvider> }
      </Layout>
    </>
  )
}