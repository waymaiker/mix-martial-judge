import { ethers } from 'ethers';
import { useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { Flex, Image, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';

import FightContract from '../../../contracts/Fight.json';

import useDataProvider from '@/hooks/useDataProvider';
import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';
import { toastError, toastSuccess } from '@/utils/methods';

import { EventsModalsCustomContent } from './EventModalsCustomContent';
import CardButton from './CardButton';

export default function CardEvent({eventId, fightType, marketingImage, title, arena, location }) {
  const { data: signer } = useSigner()
  const { address, isConnected } = useAccount()
  const { winners, getData } = useDataProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setCurrentPage, setIsLoading, setEventIdSelected } = useNavigationProvider()
  const { isGuestUserConnected, isAdminConnected, isRegisteredUserConnected } = useWhoIsConnectedProvider()
  const [modalTypeContent, setModalTypeContent] = useState("")
  const toast = useToast()

  const userJoinFight = async () => {
    setIsLoading(true);
    try {
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, FightContract.abi, signer);
      const transaction = await contract.userJoinAFightAsJudgeEnthusiast(eventId, address, {value: ethers.utils.parseEther("0.059")});
      await transaction.wait()

      await getData()
      setIsLoading(false)
      setCurrentPage("judge")

      toast(toastSuccess("New Judge Added", "Transaction validated"))
    } catch (error) {
      setIsLoading(false)
      toast(toastError("New Judge NOT Added", error.message))
    }
  }

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
                  isDisabled={winners.findIndex(winner => winner.fightId == parseInt(eventId)) == -1}
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
                action={onOpen}
                secondaryAction={() => { 
                  setModalTypeContent("join the fight");
                  setEventIdSelected(eventId);
                }}
              />
            </Flex>
        }
        {
          isGuestUserConnected &&
          <CardButton
            title={"REGISTER"}
            action={onOpen}
            secondaryAction={isConnected
            ? () => setCurrentPage("register")
            : () => setModalTypeContent("connect")}
          />
        }
      <EventsModalsCustomContent
        type={modalTypeContent}
        isOpen={isOpen}
        onClose={onClose}
        customActionButton={userJoinFight}
      />
    </Flex>
  )
}