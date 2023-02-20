import { useState } from 'react';
import { Flex, Image, Text, Tooltip, useDisclosure } from '@chakra-ui/react';

import useDataProvider from '@/hooks/useDataProvider';
import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import CardButton from './CardButton';
import { EventsModalsCustomContent } from './EventModalsCustomContent';

export default function CardEvent({fightId, fightType, marketingImage, title, arena, location }) {
  const { winners, users } = useDataProvider()
  const { setCurrentPage } = useNavigationProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isGuestUserConnected, isAdminConnected, isRegisteredUserConnected } = useWhoIsConnectedProvider()
  const [modalTypeContent, setModalTypeContent] = useState("")

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
        src={marketingImage}
        alt='ufc-fighters'
      />
      <Flex direction="column" p="10" w={"45vh"} >
        <Text fontWeight="extrabold" fontSize="2xl">{title}</Text>
        <Flex direction="column" mt="3">
          <Text color="gray.600">{arena}</Text>
          <Text color="gray.600"> {location} </Text>
        </Flex>
      </Flex>
        { 
          isAdminConnected &&
            <Flex direction="column" p="10" w="30vh">
              <Tooltip label={'Wait for the winner to be declared'} color='black'>
                <CardButton
                  title={"CREATE TOKEN FIGHT"}
                  action={onOpen}                
                  adminBackgroundColor={true}
                  secondaryAction={() => setModalTypeContent("create token")}
                  isDisabled={!winners.find(winner => winner.fightId == fightId)}
                />
              </Tooltip>
              <CardButton
                title={"GET THE JUDGE WINNER"}
                action={onOpen}                
                adminBackgroundColor={true}
                secondaryAction={() => setModalTypeContent("")}
                isDisabled={false}
              />
            </Flex>
        }
        {
          isRegisteredUserConnected &&
           <Flex direction="column" p="10" w="30vh">
              <CardButton
                title={"HOW TO WATCH"}
                action={onOpen}
                secondaryAction={() => setModalTypeContent("ads")}
              />
              <CardButton
                title={"BE A JUDGE"}
                action={() => setCurrentPage("judge")}
                secondaryAction={() => setModalTypeContent("fight access")}
              />
            </Flex>
        }
        { 
          isGuestUserConnected &&
          <CardButton
            title={"Register"}
            action={() => setCurrentPage("register")}
          />    
        }
      <EventsModalsCustomContent 
        type={modalTypeContent}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  )
}