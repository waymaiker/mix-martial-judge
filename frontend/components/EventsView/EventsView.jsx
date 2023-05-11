import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import useNavigationProvider from '@/hooks/useNavigationProvider';

import Loading from '../Loading/Loading';
import EventsContent from './components/EventsContent';

export default function EventsView({events}){
  const { isConnected, address } = useAccount()
  const { isLoading } = useNavigationProvider()

  useEffect(()=>{}, [isConnected, address])

  return (
    <>
    {
      events.length == 0
        ? <Flex grow="1" justifyContent="center" alignItems="center" mt="5">
            <Text fontWeight="bold" fontSize="7xl" fontStyle="italic"> NO UPCOMING EVENTS PROGRAMMED YET </Text>
          </Flex>
        : <EventsContent events={events} />
    }
    </>
  )
}

