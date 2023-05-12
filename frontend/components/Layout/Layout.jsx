import { useAccount } from "wagmi";
import { Flex } from "@chakra-ui/react";

import useNavigationProvider from "@/hooks/useNavigationProvider";
import useDataProvider from "@/hooks/useDataProvider";

import Header from "./Header";
import Footer from "./Footer";
import EventsView from "../EventsView/EventsView";

export default function Layout({children}) {
  const { isConnected } = useAccount()
  const { events, closedEvents } = useDataProvider()
  const { currentPage } = useNavigationProvider()

  return (
    <Flex grow="1" h="100vh" direction="column">
      <Header/>
      <Flex grow="1" direction="column">
        { isConnected && children }
        { currentPage != "judge" && <EventsView events={events} closedEvents={closedEvents}/> }
      </Flex>
      <Footer/>
    </Flex>
  )
}