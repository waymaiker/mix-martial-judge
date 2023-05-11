import Link from 'next/link';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { Flex, Image, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';

import FightContract from '../../../contracts/Fight.json';

import { getRegisteredUserCurrentlyConnectedFirebase, userSubscribeToThisEventFirebase } from '@/services/firestore_services';

import useDataProvider from '@/hooks/useDataProvider';
import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import { toastError, toastSuccess } from '@/utils/methods';

import { EventsModalsCustomContent } from './EventModalsCustomContent';
import CardButton from './CardButton';

export default function CardEvent({eventId, fightType, marketingImage, title, arena, location }) {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const { winners, setWinners, events, getData } = useDataProvider()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setCurrentPage, setIsLoading, setEventIdSelected, isLoading } = useNavigationProvider()
  const { isGuestUserConnected, isAdminConnected, isRegisteredUserConnected, currentUser, setCurrentUser } = useWhoIsConnectedProvider()

  const [modalType, showThisModalType] = useState("")
  const toast = useToast()

  const isCurrentUserPaidAccessToThisEvent = currentUser.bookedEvents.findIndex((id) => eventId == id) != -1;

  const showGetAccessModal = () => {
    showThisModalType("getAccess");
  }

  const setJudgeWinner = async (userWinnerAddress) => {
    const winner = {
      fightId: parseInt(eventId),
      winnerAddress: userWinnerAddress
    }
    setWinners([winner, ...winners])
  }

  const accessPayment = async () => {
    setIsLoading(true);
    try {
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, FightContract.abi, signer);
      const transaction = await contract.userJoinAFightAsJudgeEnthusiast(eventId, address, {value: ethers.utils.parseEther("0.059")});
      await transaction.wait()

      await getData()
      await getAccessToAnEvent()
      setIsLoading(false)

      toast(toastSuccess("Payment accepted", "Transaction validated"))
    } catch (error) {
      setIsLoading(false)
      toast(toastError("Payment denied", error.message))
    }
  }

  const getAccessToAnEvent = async () => {
    try {
      setTimeout(async () => {
        //Add this event to the list of event we have paid to access
        userSubscribeToThisEventFirebase(address, [...currentUser.bookedEvents, parseInt(eventId)])

        //Get the data we just added, from the DB
        let user = await getRegisteredUserCurrentlyConnectedFirebase(address)
        setCurrentUser({pseudo: user.pseudo, address: address, email: user.email, bookedEvents: user.bookedEvents})

        toast(toastSuccess("Access granted to "+ title + " event", "Transaction validated"))
      }, "3000");
    } catch (error) {
      setLoadingButton(false)
      toast(toastError("Access denied", error.message))
    }
  }

  /***************************** Widgets ********************************/
  const adminUserButtons = () => {
    const isWinnerDesignated = winners.findIndex(winner => winner.fightId == parseInt(eventId));

    return <Flex direction="column" p="10" w="30vh">
      <Tooltip label={'Wait for the winner to be declared'} color='black'>
        <CardButton
          title={"CREATE TOKEN FIGHT"}
          action={onOpen}
          adminBackgroundColor={true}
          secondaryAction={() => {showThisModalType("create token"), setEventIdSelected(eventId)}}
          isDisabled={isWinnerDesignated == -1}
        />
      </Tooltip>
      <CardButton
        title={"GET THE WINNER"}
        action={onOpen}
        adminBackgroundColor={true}
        secondaryAction={() => showThisModalType("setWinners")}
        isDisabled={events[eventId].participants.length > 0 || isWinnerDesignated != -1}
      />
    </Flex>
  }

  const registeredUserWithAccess = () => {
    return <Flex direction="column" p="10" w="30vh">
      <CardButton
        title={"HOW TO WATCH"}
        isLoading={isLoading}
        isDisabled={isLoading}
        action={onOpen}
        secondaryAction={() => showThisModalType("ads")}
      />
      <CardButton
        title={"BE A JUDGE"}
        isLoading={isLoading}
        isDisabled={isLoading}
        action={onOpen}
        secondaryAction={() => {
          setCurrentPage("judge")
          setEventIdSelected(eventId)
        }}
      />
    </Flex>
  }

  const registeredUserWithNoAccess = () => {
    return <Flex direction="column" p="10" w="30vh">
      <CardButton
        title={"GET ACCESS"}
        isLoading={isLoading}
        isDisabled={isLoading}
        action={onOpen}
        secondaryAction={() => showGetAccessModal()}
      />
    </Flex>
  }

  const guestUserButton = () => {
    return <Link href="#register">
      <CardButton
        title={"REGISTER"}
        isLoading={isLoading}
        isDisabled={isLoading}
        action={onOpen}
        secondaryAction={() => {
          setCurrentPage("register");
          setEventIdSelected(eventId)
        }}
      />
    </Link>
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
      {isAdminConnected && adminUserButtons()}
      {
        isRegisteredUserConnected
        ? isCurrentUserPaidAccessToThisEvent
          ? registeredUserWithAccess()
          : registeredUserWithNoAccess()
        : <></>
      }
      {isGuestUserConnected && guestUserButton()}
      <EventsModalsCustomContent
        type={modalType}
        isOpen={isOpen}
        onClose={onClose}
        getAccess={accessPayment}
        setWinner={() => setJudgeWinner(address)}
      />
    </Flex>
  )
}