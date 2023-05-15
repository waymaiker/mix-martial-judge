import { Flex } from "@chakra-ui/react";
import { useAccount } from 'wagmi'

import useNavigationProvider from "@/hooks/useNavigationProvider";
import useWhoIsConnectedProvider from "@/hooks/useWhoIsConnectedProvider";

import ConnectWallet from "./ConnectWallet";
import MenuNavigationButton from "./MenuNavigationButton";

export default function Header() {
  const { isConnected } = useAccount()
  const { currentPage } = useNavigationProvider()
  const { isRegisteredUserConnected } = useWhoIsConnectedProvider()

  return (
    isConnected
    ? <ConnectedHeader
        currentPage={currentPage}
        isRegisteredUserConnected={isRegisteredUserConnected}
      />
    : <NonConnectedHeader />
  )
}

const NonConnectedHeader = () => {
  return(
    <Flex position="fixed" top="5%" right="5%">
      <ConnectWallet/>
    </Flex>
  )
}

const ConnectedHeader = ({currentPage, isRegisteredUserConnected}) => {
  return(
    <Flex position="fixed" top="5%" right="5%">
      { currentPage == "events" && isRegisteredUserConnected && <MenuNavigationButton text={"MarketPlace"} nextPage={"marketplace"}/> }
      { currentPage == "marketplace" && isRegisteredUserConnected && <MenuNavigationButton text={"Events"} nextPage={"events"}/> }
      <ConnectWallet/>
    </Flex>
  )
}