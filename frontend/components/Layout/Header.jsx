import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { useAccount } from 'wagmi'

import useNavigationProvider from "@/hooks/useNavigationProvider";
import ConnectWallet from "./ConnectWallet";

export default function Header() {
  const { isConnected } = useAccount()
  const { currentPage, setCurrentPage } = useNavigationProvider()

  return (
    <>
    {
      isConnected
      ? <ConnectedHeader currentPage={currentPage} setCurrentPage={setCurrentPage} />
      : <NonConnectedHeader />
    }
    </>
  )
}

const NonConnectedHeader = () => {
  return(
    <Flex position="fixed" top="5%" right="5%">
      <ConnectWallet/>
    </Flex>
  )
}

const ConnectedHeader = ({y, currentPage, setCurrentPage}) => {
  return(
    <Flex h="8vh" >
      <Menu currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </Flex>
  )
}

const Menu = ({y, currentPage, setCurrentPage}) =>
  <>
    <Flex w={ y < 10 ? "150vh" : "100%"} alignItems="center" justifyContent="space-between"  backgroundColor="black">
      <Flex ml='10'>
        <MenuItem
          text="EVENTS"
          setCurrentPage={setCurrentPage}
          selected={currentPage == "events"}
        />
        <MenuItem
          text="ATHLETES"
          setCurrentPage={setCurrentPage}
          selected={currentPage == "athletes"}
        />
      </Flex>
      <TextMenu size="6xl" text="UFJ"/>
      <Flex mr="10">
        <MenuItem
          text="SHOP"
          setCurrentPage={setCurrentPage}
          selected={currentPage === "shop"}
        />
        <MenuItem
          text="REGISTER"
          setCurrentPage={setCurrentPage}
          selected={currentPage == "register"}
        />
      </Flex>
    </Flex>
  </>

const MenuItem = ({text, selected, setCurrentPage}) => {
  return(
    <Flex onClick={() => setCurrentPage(text.toLowerCase())}>
      <Box direction="column"  justifyItems="center">
        <TextMenu size="2xl" text={text} />
        <Box ml="10%" mr="30%" borderBottom="4px" borderBottomColor={selected ? "red" : ""}/>
      </Box>
    </Flex>
  )
}

const TextMenu = ({size, text}) =>
  <Text
    color="white"
    fontSize={size}
    fontWeight="extrabold"
    fontStyle="italic"
    fontFamily="Arial"
    p="2"
  >
    {text}
  </Text>