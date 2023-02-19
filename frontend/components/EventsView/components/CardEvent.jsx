import { useAccount } from 'wagmi';
import { useState } from 'react';
import { Flex, Image, Text, useDisclosure } from '@chakra-ui/react';

import useDataProvider from '@/hooks/useDataProvider';
import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import CardButton from './CardButton';
import CustomModal from '../../CustomModal/CustomModal';
import FightAccess from '../../FightView/components/FightAccess';
import CreateFightToken from './CreateTokenFight';

export default function CardEvent({fightType, marketingImage, title, arena, location}) {
  const { isConnected } = useAccount()
  const { setCurrentPage } = useNavigationProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isSuperAdminConnected, isAdminConnected, isRegisteredUserConnected } = useWhoIsConnectedProvider()
  const [modalTypeContent, setModalTypeContent] = useState("")
  const isRegisteredUserOpen = isRegisteredUserConnected ? onOpen : () => setCurrentPage("register") 

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
          isAdminConnected
          ? <Flex direction="column" p="10" w="30vh">
              <CardButton
                title={"CREATE TOKEN FIGHT"}
                action={onOpen}
                adminBackgroundColor={true}
                secondaryAction={() => setModalTypeContent("create token")}
              />
            </Flex>
          : <Flex direction="column" p="10" w="30vh">
              <CardButton
                title={"HOW TO WATCH"}
                action={onOpen}
                secondaryAction={() => setModalTypeContent("ads")}
              />
              <CardButton
                title={"BE A JUDGE"}
                action={
                  isConnected 
                  ? isSuperAdminConnected ? ()=>{} : () => isRegisteredUserOpen()
                  : onOpen
                }
                secondaryAction={isSuperAdminConnected ? () => {setModalTypeContent("superAdmin"); onOpen()} : () => setModalTypeContent("fight access")}
              />
            </Flex>
      }
      <CustomModalContent 
        type={modalTypeContent}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  )
}

const CustomModalContent = ({type, isOpen, onClose}) => {
  switch (type) {
    case "create token":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomSize={true}
        isCustomFooter={true}
        children={<CreateFightToken onClose={onClose} />}
      />    
    case "fight access":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={false}
        children={<FightAccess />}
      />    
    case "ads":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={false}
        children={<Text color={"green"}> ADVERTISEMENT SPACE FOR OUR STREAMING PLATFORM </Text>}
      />
    case "superAdmin":
      return <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        isCustomFooter={true}
        children={<Text color={"green"}> As a SuperAdmin you dont have access to this feature, contact an admin </Text>}
      />    
    default:
      break;
  }
}