import React, { useState, useEffect, createContext } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

import FightContract from '../contracts/Fight.json';

import useDataProvider from "@/hooks/useDataProvider";
import useNavigationProvider from "@/hooks/useNavigationProvider";

import { toastError, toastSuccess } from "@/utils/methods";
import { getRegisteredUserCurrentlyConnectedFirebase } from "@/services/firestore_services";

const WhoIsConnectedContext = createContext(null)

export const WhoIsConnectedProvider = ({ children }) => {
  const [admins, setAdmins] = useState([])
  const [currentUser, setCurrentUser] = useState({address:'', pseudo: '', email:'', bookedEvents:[], finishedEvents: []})
  const [isRegisteredUserConnected, setIsRegisteredUserConnected] = useState(false)
  const [isSuperAdminConnected, setIsSuperAdminConnected] = useState(false)
  const [isGuestUserConnected, setIsGuestUserConnected] = useState(false)
  const [isAdminConnected, setIsAdminConnected] = useState(false)

  const { address, isConnected } = useAccount()
  const { isLoading } = useNavigationProvider()
  const { users } = useDataProvider()
  const toast = useToast()

  const resetDatas = () => {
    setAdmins([])
  }

  const getAdmins = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contractEvent = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, FightContract.abi, provider)
    const dataEvents = await contractEvent.queryFilter({ address: process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, fromBlock: 0 })

    resetDatas([])
    catchAdminAddedEvent(dataEvents, setAdmins)
  }

  const whoIsConnected = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contractEvent = new ethers.Contract(process.env.NEXT_PUBLIC_FIGHT_SCADDRESS_LOCALHOST, FightContract.abi, provider)
      const superAdmin = await contractEvent.owner()
      const _isSuperAdminConnected = address == superAdmin
      const _isAdminConnected = admins.includes(address)
      const _isRegisteredUserConnected = users.findIndex(user => user.address == address) != -1
      const _isGuestUserConnected = !_isSuperAdminConnected && !_isAdminConnected && !_isRegisteredUserConnected && isConnected

      setIsRegisteredUserConnected(_isRegisteredUserConnected)
      setIsAdminConnected(_isAdminConnected)
      setIsSuperAdminConnected(_isSuperAdminConnected)
      setIsGuestUserConnected(_isGuestUserConnected)

      if(_isSuperAdminConnected || _isAdminConnected) {
        toast(toastSuccess("Account connected", _isSuperAdminConnected ? "SUPER ADMIN" : "ADMIN", "top"))
      }
      if(_isRegisteredUserConnected && currentUser.address.length == 0){
        let user = await getRegisteredUserCurrentlyConnectedFirebase(address)
        setCurrentUser({
          pseudo: user.pseudo,
          address: address,
          email: user.email,
          bookedEvents: user.bookedEvents,
          finishedEvents: user.finishedEvents
        })
      }
    } catch (error) {
      toast(toastError("Connected Account", error.reason))
    }
  }

  useEffect(()=>{
    getAdmins()
  }, [isLoading])

  useEffect(()=>{
    if(isConnected){
      whoIsConnected()
    }
  }, [isConnected, address, currentUser])

  return (
    <WhoIsConnectedContext.Provider value={{
      isRegisteredUserConnected,
      isSuperAdminConnected,
      isGuestUserConnected,
      isAdminConnected,
      whoIsConnected,
      setCurrentUser,
      currentUser,
      admins
    }}>
      {children}
    </WhoIsConnectedContext.Provider>
  )
}

export default WhoIsConnectedContext;


const catchAdminAddedEvent = (dataEvents, setAdmins) =>{
  dataEvents.forEach((event) => {
   if(event.event === "AdminAdded"){
     setAdmins(admins => [event.args.adminAddress, ...admins])
   }
 })
}