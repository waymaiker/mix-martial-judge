import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import EventsContent from './components/EventsContent';

export default function EventsView({events}){
  const { isConnected, address } = useAccount()

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

