import { useEffect, createContext, useState } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

import FightContract from '../contracts/Fight.json';
import UserFactoryContract from '../contracts/UserFactory.json';

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const toast = useToast()
  const {address, isConnected} = useAccount()
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])
  const [winners, setWinners] = useState([])
  const [closedEvents, setClosedEvents] = useState([])

  const resetDatas = () => {
    setUsers([])
    setEvents([])
  }

  const getData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contractEvents = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, FightContract.abi, provider)
      const contractUserFactory = new ethers.Contract(process.env.NEXT_PUBLIC_USERFACTORY_SCADDRESS_LOCALHOST, UserFactoryContract.abi, provider)
      const dataEvents = await contractEvents.queryFilter({ address: process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, fromBlock: 0 })
      const dataUsers = await contractUserFactory.queryFilter({ address: process.env.NEXT_PUBLIC_USERFACTORY_SCADDRESS_LOCALHOST, fromBlock: 0 })

      resetDatas()
      catchWinnerEvent(dataEvents, setWinners)
      catchEventCreatedEvent(dataEvents, setEvents)
      catchUserHasJoinedAFightEvent(dataEvents, setEvents)
      catchUserCreatedEvent(dataUsers, setUsers)
    } catch (error) {
      toast({ title: "Error - GetData", description: error.reason, status: 'error', duration: 5000, isClosable: true })
    }
  }

  useEffect(() => {
    getData()
  }, [isConnected, address])

  return (
    <DataContext.Provider value={{
      setClosedEvents,
      closedEvents,
      setWinners,
      getData,
      winners,
      events,
      users
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;

const catchUserCreatedEvent = (usersEvents, setUsers) => {
  usersEvents.forEach((event) => {
    if(event.event === "UserCreated"){
      setUsers(users =>[{
          userContractAddress: event.args.userContractAddress,
          address: event.args.userAddress,
          pseudo: event.args.pseudo
        }, ...users
      ])
    }
  })
}

const catchEventCreatedEvent = (eventsEvents, setEvents) => {
  eventsEvents.forEach((event) => {
    if(event.event === "FightCreated"){
      setEvents(events =>[{
          fightId: event.args.fightId,
          adminAddress: event.args.adminAddress,
          fighterOne: event.args.fighterOne,
          fighterTwo: event.args.fighterTwo,
          arena: event.args.arena,
          location: event.args.location,
          fightType: event.args.fightType,
          fileLink: event.args.fileLink,
          fileCID: event.args.fileCID,
          participants:[]
        }, ...events
      ])
    }
  })
}

const catchUserHasJoinedAFightEvent = (userHasJoinedAFightEvents, setEvents) => {
  userHasJoinedAFightEvents.forEach((event) => {
    if(event.event === "UserHasJoinedAFight"){
      setEvents(events => {
        events[event.args.fightId] = {
         ...events[event.args.fightId],
         nbTicketsSold: parseInt(event.args.fightTicketId),
         participants: [...events[event.args.fightId].participants, event.args.userAddress]
        }
        return events;
      })
    }
  })
}


const catchWinnerEvent = (fightEvents, setWinners) => {
  fightEvents.forEach((event) => {
    if(event.event === "UserWinner"){
      setWinners(winners => [{
        fightId: parseInt(event.args.fightId),
        userAddress: event.args.userAddress,
      }, ...winners])
    }
  })
}