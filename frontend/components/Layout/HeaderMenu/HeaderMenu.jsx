import { Flex, Box, Text } from "@chakra-ui/react";
import ConnectWallet from "../ConnectWallet";

export default function HeaderMenu({currentPage, setCurrentPage}){
  return (
    <Flex ml={"10%"} mr={"10%"} w={"150vh"} alignItems="center" justifyContent="space-between"  backgroundColor="black">
      <Flex ml='10'>
        <MenuItem
          text="EVENTS"
          setCurrentPage={setCurrentPage}
          selected={currentPage == "events"}
        />
        {/* <MenuItem
          text="ATHLETES"
          setCurrentPage={setCurrentPage}
          selected={currentPage == "athletes"}
        /> */}
      </Flex>
      <TextMenu size="6xl" text="UFJ"/>
      <Flex mr="10">
        {/* <MenuItem
          text="SHOP"
          setCurrentPage={setCurrentPage}
          selected={currentPage === "shop"}
        /> */}
        <MenuItem
          text="REGISTER"
          setCurrentPage={setCurrentPage}
          selected={currentPage == "register"}
        />
        <ConnectWallet/>
      </Flex>
    </Flex>
  )
}

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

const TextMenu = ({size, text}) => {
  return (
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
  )
}