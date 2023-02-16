import { Flex, Text } from '@chakra-ui/react';

import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import useNavigationProvider from '@/hooks/useNavigationProvider';

import CardEvent from './CardEvent';
import CardAddEvent from './CardAddEvent';
import Loading from '../Loading/Loading';

export default function EventsView({events}){
  const { isConnected } = useAccount()
  const { isLoading } = useNavigationProvider()

  useEffect(()=>{}, [isLoading])

  return (
    <>  
      {isConnected ? <CardAddEvent/> : <></>}
      {
        isLoading
        ? <Loading />
        : <>
          { !events.length == 0 
            ? <>
                <Flex justifyContent="center" mt="5">
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
                      fightersImage={event.filename}
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

