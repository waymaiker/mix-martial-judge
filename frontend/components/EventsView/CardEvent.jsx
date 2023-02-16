import { Flex, Image, Text, useDisclosure } from '@chakra-ui/react';

import useNavigationProvider from '@/hooks/useNavigationProvider';
import CardButton from './CardButton';
import CustomModal from '../CustomModal/CustomModal';
import { useAccount } from 'wagmi';

export default function CardEvent({fightType, fightersImage, title, arena, location}) {
  const { isConnected } = useAccount()
  const { setCurrentPage } = useNavigationProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex justifyContent="center" alignItems="center" p="10">
      <Image
        src={"/"+fightType+".png"}
        w="7%"
        h="50%"
        mr="5"
        alt='ufc-typeofcombat'
      />
      <Image
        objectFit='cover'
        maxW="22%"
        src={fightersImage}
        alt='ufc-fighters'
      />
      <Flex direction="column" p="10" w="45vh">
        <Text fontWeight="extrabold" fontSize="2xl">{title}</Text>
        <Flex direction="column" mt="3">
          <Text color="gray.600">{arena}</Text>
          <Text color="gray.600"> {location} </Text>
        </Flex>
      </Flex>
      <Flex direction="column" p="10" w="30vh">
        <CardButton 
          title={"HOW TO WATCH"} 
          action={onOpen}
        />
        <CardButton 
          title={"BE A JUDGE"} 
          action={isConnected ? () => setCurrentPage("register") : ()=>{}}
        />
      </Flex>
      <CustomModal 
        isOpen={isOpen} 
        onClose={onClose} 
        children={<Text color={"red"}> ADS </Text>}/>
    </Flex>
  )
}
