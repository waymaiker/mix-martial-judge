import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import useWhoIsConnectedProvider from '@/hooks/useWhoIsConnectedProvider';

import EventsContent from './components/EventsContent';
import { useAccount } from 'wagmi';

export default function EventsView({events, closedEvents}){
  //Providers
  const { currentUser } = useWhoIsConnectedProvider()

  //States
  const [ selectedView, selectView ] = useState(false)
  const [ listEvent, setListEvent ] = useState([])

  useEffect(()=>{
    setListEvent(events)
  }, [events])

  useEffect(()=>{
    selectedView
      ? setListEvent(events.filter((event) => closedEvents.includes(parseInt(event.fightId))))
      : setListEvent(events.filter((event) => !closedEvents.includes(parseInt(event.fightId))))
  }, [selectedView, currentUser, events, closedEvents])

  return (
    <>
      <Flex justifyContent="center" mt="20" cursor={'default'}>
        <Text
          fontWeight="bold"
          fontSize="7xl"
          fontStyle="italic"
          mr={"50px"}
          onClick={()=>selectView(true)}
          opacity={selectedView ? 1 : 0.5}
        > PAST </Text>
        <Text
          fontWeight="bold"
          fontSize="7xl"
          fontStyle="italic"
          onClick={()=>selectView(false)}
          opacity={!selectedView ? 1 : 0.5}> UPCOMING </Text>
      </Flex>
      <Flex justifyContent="center" alignItems={'center'} mt="5">
        {
          listEvent.length == 0
          ? <></>
          : <Text fontWeight="bold" fontSize="3xl">
              {listEvent.length} {listEvent.length > 1 ? "EVENTS" : "EVENT"}
            </Text>
        }
      </Flex>
      {
        listEvent.length > 0
        ? <EventsContent
            events={listEvent}
            closedEvents={closedEvents}
            currentUser={currentUser}
          />
        : <Flex grow="1" justifyContent="center" alignItems="center" mt="5">
        {
          selectedView
          ? <Text fontWeight="bold" fontSize="7xl" fontStyle="italic"> NO PAST EVENTS </Text>
          : events.length == 0
            ? <Text fontWeight="bold" fontSize="7xl" fontStyle="italic"> NO UPCOMING EVENTS PROGRAMMED YET </Text>
            : <></>
        }
        </Flex>
      }
    </>
  )
}

