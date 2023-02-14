import { Flex, Image } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({children}) {
  const { isConnected } = useAccount()

  return (
    <Flex h="100vh" direction="column">
      <Header/>    
        { isConnected ? <ViewConnected children={children} />  : <ViewDisconnected /> }
      <Footer/>
    </Flex>
  )
}

const ViewConnected = ({children}) =>
  <Flex grow="1" direction="column">
    {children}
  </Flex>

const ViewDisconnected = () =>
  <Flex grow="1">
    <Image w="100%" src="./israel-adesanya.jpeg"/>
  </Flex>