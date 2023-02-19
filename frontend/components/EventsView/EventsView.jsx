import { Flex, Text } from '@chakra-ui/react';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import useNavigationProvider from '@/hooks/useNavigationProvider';
import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import CardEvent from './components/CardEvent';
import CardAddEvent from './components/CardAddEvent';
import Loading from '../Loading/Loading';

export default function EventsView({events}){
  const { isConnected, address } = useAccount()
  const { isLoading } = useNavigationProvider()
  const { isAdminConnected } = useWhoIsConnectedProvider()

  useEffect(()=>{}, [isConnected, address])

  return (
    <>  
      {isAdminConnected ? <CardAddEvent/> : <></>}
      {
        isLoading
        ? <Loading />
        : <>
          { !events.length == 0 
            ? <>
                <Flex justifyContent="center" mt="20">
                  <Text fontWeight="bold" fontSize="7xl" fontStyle="italic"> UPCOMING </Text>
                </Flex>
                <Flex justifyContent="center" mt="5">
                  <Text fontWeight="bold" fontSize="3xl"> {events.length} EVENTS </Text>
                </Flex>
                {
                  events.map((event, index) =>
                    <CardEvent
                      key={index}
                      fightType={event.fightType ? "championship" : "regular"}
                      marketingImage={event.fileLink}
                      title={event.fighterOne + " vs "+ event.fighterTwo}
                      arena={event.arena}
                      location={event.location}
                    />
                  )
                }
              </>
            : <Flex grow="1" justifyContent="center" alignItems="center" mt="5">
                <Text fontWeight="bold" fontSize="7xl" fontStyle="italic"> NO UPCOMING EVENTS PROGRAMMED YET </Text>
              </Flex>
          }
        </>
      }
    </>
  )
}

