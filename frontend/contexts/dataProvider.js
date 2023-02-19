import { useEffect, createContext, useState } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";

import { fightContract, userContract } from "@/utils/constants";
import { useToast } from "@chakra-ui/react";

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const toast = useToast()
  const {address, isConnected} = useAccount()
  const [users, setUsers] = useState([])
  const [events, setEvents] = useState([])

  const resetDatas = () => {
    setUsers([])
    setEvents([])
  }

  const getData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contractEvent = new ethers.Contract(fightContract.address, fightContract.abi, provider)
      const contractUser = new ethers.Contract(userContract.address, userContract.abi, provider)
      const dataEvents = await contractEvent.queryFilter({ address: fightContract.address, fromBlock: 0 })
      const dataUsers = await contractUser.queryFilter({ address: userContract.address, fromBlock: 0 })

      console.log(dataUsers);

      resetDatas()
      catchEventCreatedEvent(dataEvents, setEvents)
      catchUserCreatedEvent(dataUsers, setUsers)

      console.log(users);
      // console.log(events);
    } catch (error) {
      toast({ title: "Error - GetData", description: error.reason, status: 'error', duration: 5000, isClosable: true })
    }
  }

  useEffect(() => {
    getData()
  }, [isConnected, address])

  return (
    <DataContext.Provider value={{
      getData,
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
          address: event.args.address,
          firstname: event.args.firstname,
          lastname: event.args.lastname,
          email: event.args.email,
          country: event.args.country,
          dob: event.args.dob,
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
          fileCID: event.args.fileCID
        }, ...events
      ])
    }
  })
}