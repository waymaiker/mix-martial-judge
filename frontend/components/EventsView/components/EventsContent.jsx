import { AnimationZoomListItem } from "@/utils/animations";

import CardEvent from "./CardEvent";

export default function EventsContent({events, currentUser, closedEvents}){
  return(
    <>
      {
        events.map((event, index) =>
          <AnimationZoomListItem key={index}>
            <CardEvent
              key={index}
              isDisabled={
                closedEvents.includes(parseInt(event.fightId)) ||
                (currentUser.finishedEvents
                  .findIndex((finishedEvent) => finishedEvent == event.fightId) != -1
                )
              }
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