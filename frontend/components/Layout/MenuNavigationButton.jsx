import { Flex, Text } from "@chakra-ui/react";
import { AnimationZoomItem } from "@/utils/animations";

import useNavigationProvider from "@/hooks/useNavigationProvider";

export default function MenuNavigationButton({text, nextPage}) {
  const { setCurrentPage } = useNavigationProvider()

  return (
    <AnimationZoomItem>
      <Flex
        p={"7px"}
        m={"20px"}
        shadow={"md"}
        cursor={"pointer"}
        paddingLeft={'20px'}
        paddingRight={'20px'}
        borderRadius={"12px"}
        backgroundColor={"white"}
        onClick={() => setCurrentPage(nextPage) }
      >
        <Text fontWeight={"semibold"} fontSize="lg"> {text} </Text>
      </Flex>
    </AnimationZoomItem>
  )
}