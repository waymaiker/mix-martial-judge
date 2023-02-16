import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({children}) {
  const { isConnected } = useAccount()

  return (
    <Flex>
      <Flex w={"1000vh"} h="100vh" direction="column">
        <Header/>
        <Flex grow="1" direction="column">
          {children}
        </Flex>
        <Footer/>
      </Flex>
    </Flex>
  )
}
// { isConnected ? <ViewConnected children={children} />  : <ViewDisconnected children={children} /> }

const ViewConnected = ({children}) =>
  <Flex grow="1" direction="column">
    {children}
  </Flex>

const ViewDisconnected = ({children}) =>
  <Flex grow="1" direction="column">
    {children}
  </Flex>