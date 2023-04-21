import { Flex, Text } from '@chakra-ui/react'

export default function Footer() {
    return (
      <Flex direction="column" h="10vh" p="2%" alignItems="center" justifyContent="center">
        <Text> © Watson {new Date().getFullYear()} </Text>
        <Text> I own none of the pictures used for this project and have no rights on them {new Date().getFullYear()} </Text>
      </Flex>
    )
}