import React, { useState, useEffect, createContext } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/react";

import useDataProvider from "@/hooks/useDataProvider";
import useNavigationProvider from "@/hooks/useNavigationProvider";

import { fightContract } from "@/utils/constants";
import { toastError, toastSuccess } from "@/utils/methods";

const WhoIsConnectedContext = createContext(null)

export const WhoIsConnectedProvider = ({ children }) => {
  const [admins, setAdmins] = useState([])
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
    const contractEvent = new ethers.Contract(fightContract.address, fightContract.abi, provider)
    const dataEvents = await contractEvent.queryFilter({ address: fightContract.address, fromBlock: 0 })

    resetDatas([])
    catchAdminAddedEvent(dataEvents, setAdmins)
  }

  const whoIsConnected = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contractEvent = new ethers.Contract(fightContract.address, fightContract.abi, provider)
      const superAdmin = await contractEvent.owner()
      const _isSuperAdminConnected = address == superAdmin
      const _isAdminConnected = admins.includes(address)
      const _isRegisteredUserConnected = users.findIndex(user => user.address == address) != -1
      const _isGuestUserConnected = !_isSuperAdminConnected && !_isAdminConnected && !_isRegisteredUserConnected

      setIsRegisteredUserConnected(_isRegisteredUserConnected)
      setIsAdminConnected(_isAdminConnected)
      setIsSuperAdminConnected(_isSuperAdminConnected)
      setIsGuestUserConnected(_isGuestUserConnected)

      if(_isSuperAdminConnected || _isAdminConnected) {
        toast(toastSuccess("Account connected", _isSuperAdminConnected ? "SUPER ADMIN" : "ADMIN", "top"))
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
  }, [isConnected, address])

  return (
    <WhoIsConnectedContext.Provider value={{
      isRegisteredUserConnected,
      isSuperAdminConnected,
      isGuestUserConnected,
      isAdminConnected,
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