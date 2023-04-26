import { Flex, Text } from "@chakra-ui/react";

import { AnimationZoomListItem } from "@/utils/animations";

import CardEvent from "./CardEvent";

export default function EventsContent({events}){
  return(
    <>
      <Flex justifyContent="center" mt="20">
        <Text fontWeight="bold" fontSize="7xl" fontStyle="italic"> UPCOMING </Text>
      </Flex>
      <Flex justifyContent="center" mt="5">
        <Text fontWeight="bold" fontSize="3xl"> {events.length} EVENTS </Text>
      </Flex>
      {
        events.map((event, index) =>
          <AnimationZoomListItem key={index}>
            <CardEvent
              key={index}
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