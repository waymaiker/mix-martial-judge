import { useState } from 'react';
import { useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';

import FightContract from '../../contracts/Fight.json';

import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import { CustomInput } from '@/components/CustomInput/CustomInput';
import { toastError, toastSuccess } from '@/utils/methods';

export default function SuperAdminView(){
  const [adminAddressProvided, setAdminAddressProvided] = useState("")
  const { admins } = useWhoIsConnectedProvider()
  const { setIsLoading, isLoading } = useNavigationProvider()
  const { data: signer } = useSigner()
  const toast = useToast()

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
    <Flex direction={'column'} justifyContent={"center"} alignItems='center'>
      <Text color='red' fontWeight="extrabold" mt="2%"> PAGE </Text>
      <Text fontWeight="bold" fontSize="7xl" fontStyle="italic">  ADD A PLATFORM ADMINISTRATOR</Text>
      <Stack direction='column' alignItems={"center"} shadow={"xl"} borderRadius="10" w="100vh" p="20" mt="5" mb="5">
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
        <Flex direction={"column"} w="85vh" alignContent={"flex-start"}>
          <Text>
            Registered administrators:
          </Text>
          {
            admins.length > 0 ? admins.map(admin => <Text> {admin}</Text>) : <Text> NO ADMINS </Text>
          }
        </Flex>
      </Stack>
    </Flex>
  )
}