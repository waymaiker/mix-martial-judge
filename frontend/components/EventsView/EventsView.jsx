import { Flex, Image, Text } from '@chakra-ui/react';

import CardEvent from './CardEvent';

export default function EventsView({events}){
  return (
    <>
      {/* <Image src='/jonesvsgane.jpg' top="-10" /> */}
      <Flex justifyContent="center" mt="5">
        <Text fontWeight="bold" fontSize="7xl" fontStyle="italic" color="gray.500" mr='10'> PAST </Text>
        <Text fontWeight="bold" fontSize="7xl" fontStyle="italic"> UPCOMING </Text>
      </Flex>
      <Flex justifyContent="center" mt="5">
        <Text fontWeight="bold" fontSize="3xl"> {events.length} EVENTS </Text>
      </Flex>
      {
        events.map((event, index) =>
          <CardEvent
            key={index}
            fightType={event.fightType}
            fightersImage={event.fightersImage}
            title={event.title}
            arena={event.arena}
            location={event.location}
          />
        )
      }
    </>
  )
}

