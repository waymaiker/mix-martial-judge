import { useState } from 'react';
import { useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { Button, Flex, Stack, Stat, StatHelpText, StatLabel, StatNumber, Text, useToast } from '@chakra-ui/react';

import FightContract from '../../contracts/Fight.json';

import useDataProvider from '@/hooks/useDataProvider';
import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import { CustomInput } from '@/components/CustomInput/CustomInput';
import { toastError, toastSuccess } from '@/utils/methods';

export default function SuperAdminView(){
  //Providers
  const { admins } = useWhoIsConnectedProvider()
  const { events } = useDataProvider()
  const { setIsLoading, isLoading } = useNavigationProvider()

  //States
  const [adminAddressProvided, setAdminAddressProvided] = useState("")

  //Wagmi
  const { data: signer } = useSigner()

  //Chakra-UI
  const toast = useToast()

  const getTotalMoneyGenerated = () => {
    let balance = 0;
    events.map((event) => balance = balance + (event.nbTicketsSold * 0.059))
    return balance;
  }

  const getNumberOfTicketsSold = () => {
    let nbOfTickets = 0;
    events.map((event) => nbOfTickets = nbOfTickets + event.nbTicketsSold)
    return nbOfTickets;
  }

  const submit = async () => {
    setIsLoading(true);
    try {
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, FightContract.abi, signer);
      const transaction = await contract.addAdmin(adminAddressProvided);
      await transaction.wait()

      setIsLoading(false)
      toast(toastSuccess("AdminAdded", "Transaction validated"))
    } catch (error) {
      setIsLoading(false)
      toast(toastError("AdminAdded", error.message))
    }
  }

  return (
    <Flex direction='column' justifyContent="center" alignItems='center' backgroundColor="red.600" shadow='xl' pb='20'>
      <Text fontWeight="extrabold" mt="2%"> PAGE </Text>
      <Text fontWeight="bold" fontSize="7xl" fontStyle="italic" color={"white"}> ADD A PLATFORM ADMINISTRATOR </Text>
      <Stack direction='column' alignItems={"center"} shadow={"xl"} backgroundColor={"white"} borderRadius="10" w="100vh" p="20" mt="5" mb="5">
        <Flex w="100%" alignItems="flex-start">
          <Stat>
            <StatLabel>Money generated accross all events: </StatLabel>
            <StatNumber>{getTotalMoneyGenerated()} ETH</StatNumber>
            <StatHelpText>Tickets Only</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Number of tickets sold: </StatLabel>
            <StatNumber>{getNumberOfTicketsSold()}</StatNumber>
            <StatHelpText>All time</StatHelpText>
          </Stat>
        </Flex>
        <CustomInput
          title={'Admin Address'}
          type="text"
          textHelper={"Address will be granted admin priviledges"}
          input={adminAddressProvided}
          handleInputChange={setAdminAddressProvided}
          isError={adminAddressProvided.length === 0}
          defaultCase={true}
        />
        <Button
          isLoading={isLoading}
          isDisabled={adminAddressProvided.length === 0}
          fontSize="xl"
          colorScheme='red'
          onClick={() => submit()}
        >
          SUBMIT
        </Button>
        <Flex direction="column" w="85vh" alignContent="flex-start">
          <Text fontWeight="bold">
            Registered administrators:
          </Text>
          {
            admins.length > 0 ? admins.map((admin, index) => <Text key={index}> {admin}</Text>) : <Text> NO ADMINS </Text>
          }
        </Flex>
      </Stack>
    </Flex>
  )
}