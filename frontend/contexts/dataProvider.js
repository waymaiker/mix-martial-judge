import { useEffect, createContext, useState } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";

import { fightContract, userFactoryContract } from "@/utils/constants";
import { useToast } from "@chakra-ui/react";

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const toast = useToast()
  const {address, isConnected} = useAccount()
  const [users, setUsers] = useState([])
  const [events, setFights] = useState([])
  const [winners, setWinners] = useState([])

  const resetDatas = () => {
    setUsers([])
    setFights([])
  }

  const getData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contractFight = new ethers.Contract(fightContract.address, fightContract.abi, provider)
      const contractUserFactory = new ethers.Contract(userFactoryContract.address, userFactoryContract.abi, provider)
      const dataFights = await contractFight.queryFilter({ address: fightContract.address, fromBlock: 0 })
      const dataUsers = await contractUserFactory.queryFilter({ address: userFactoryContract.address, fromBlock: 0 })

      resetDatas()
      catchWinnerEvent(dataFights, setWinners)
      catchFightCreatedEvent(dataFights, setFights)
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
          address: event.args._userAddress,
          firstname: event.args._firstname,
          lastname: event.args._lastname,
          email: event.args._email,
          country: event.args.country,
          dob: event.args._dob,
        }, ...users
      ])
    }
  })
}

const catchFightCreatedEvent = (fightEvents, setFights) => {
  fightEvents.forEach((event) => {
    if(event.event === "FightCreated"){
      setFights(events =>[{
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

const catchWinnerEvent = (fightEvents, setWinners) => {
  fightEvents.forEach((event) => {
    if(event.event === "UserWinner"){
      setWinners(winners => [{
        fightId: event.args.fightId,
        userAddress: event.args.userAddress,
      }, ...winners])
    }
  })
}