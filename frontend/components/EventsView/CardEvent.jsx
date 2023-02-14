import { Flex, Image, Text, useDisclosure } from '@chakra-ui/react';

import useNavigationProvider from '@/hooks/useNavigationProvider';
import CardButton from './CardButton';
import CustomModal from '../CustomModal/CustomModal';

export default function CardEvent({fightType, fightersImage, title, arena, location}) {
  const { setCurrentPage } = useNavigationProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex justifyContent="center" alignItems="center" p="10">
      <Image
        src={"/"+fightType+".png"}
        w="7%"
        h="50%"
        mr="5"
        alt='ufc'
      />
      <Image
        objectFit='cover'
        maxW="22%"
        src={"/" + fightersImage + ".png"}
        alt='ufc'
      />
      <Flex direction="column" p="10" w="45vh">
        <Text fontWeight="extrabold" fontSize="2xl">{title}</Text>
        <Flex direction="column" mt="3">
          <Text color="gray.600">{arena}</Text>
          <Text color="gray.600"> {location} </Text>
        </Flex>
      </Flex>
      <Flex direction="column" p="10" w="30vh">
        <CardButton title={"HOW TO WATCH"} />
        <CardButton 
          title={"BE A JUDGE"} 
          getMyTicket={onOpen} 
          //getMyTicket={() => setCurrentPage('judge')} 
          //<Button onClick={onOpen}>Open Modal</Button>
        />
      </Flex>
      <CustomModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
