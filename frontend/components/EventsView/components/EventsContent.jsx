import { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";

import { AnimationZoomListItem } from "@/utils/animations";

import CardEvent from "./CardEvent";
import useWhoIsConnectedProvider from "@/hooks/useWhoIsConnectedProvider";

export default function EventsContent({events}){
  //Providers
  const { currentUser } = useWhoIsConnectedProvider()

  //States
  const [ selectedView, selectView ] = useState(true)
  const [ listEvent, setListEvent ] = useState([])

  useEffect(()=>{
    selectedView
    ? setListEvent(events.filter((event) => currentUser.finishedEvents.includes(parseInt(event.fightId))))
    : setListEvent(events.filter((event) => !currentUser.finishedEvents.includes(parseInt(event.fightId))))
  }, [selectedView])

  return(
    <>
      <Flex justifyContent="center" mt="20" cursor={'default'}>
        <Text
          fontWeight="bold"
          fontSize="7xl"
          fontStyle="italic"
          mr={"50px"}
          onClick={()=>selectView(true)}
          opacity={selectedView ? 0.5 : 1}
        > PAST </Text>
        <Text
          fontWeight="bold"
          fontSize="7xl"
          fontStyle="italic"
          onClick={()=>selectView(false)}
          opacity={!selectedView ? 0.5 : 1}> UPCOMING </Text>
      </Flex>
      <Flex justifyContent="center" mt="5">
        <Text fontWeight="bold" fontSize="3xl"> {listEvent.length} {listEvent.length > 1 ? "EVENTS" : "EVENT"}  </Text>
      </Flex>
      {
        listEvent.map((event, index) =>
          <AnimationZoomListItem key={index}>
            <CardEvent
              key={index}
              isDisabled={currentUser.finishedEvents.findIndex((finishedEvent) => finishedEvent == event.fightId) != -1}
              arena={event.arena}
              eventId={event.fightId}
              location={event.location}
              marketingImage={event.fileLink}
              title={event.fighterOne + " vs "+ event.fighterTwo}
              fightType={event.fightType ? "championship" : "regular"}
            />
          </AnimationZoomListItem>
        )
      }
    </>
  )
}