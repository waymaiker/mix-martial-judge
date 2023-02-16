import { Flex } from "@chakra-ui/react";
import { useAccount } from 'wagmi'

import useNavigationProvider from "@/hooks/useNavigationProvider";

import HeaderMenu from "./HeaderMenu/HeaderMenu";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  const { isConnected } = useAccount()
  const { currentPage, setCurrentPage } = useNavigationProvider()

  return (
    isConnected
    ? <ConnectedHeader 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}         
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

const ConnectedHeader = ({currentPage, setCurrentPage}) => {
  return(
    <Flex position="fixed" top="5%" right="5%">
      {/* <HeaderMenu currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
      <ConnectWallet/>
    </Flex>
  )
}