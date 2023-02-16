import React, { useState, useEffect, createContext } from "react";
import { useAccount } from 'wagmi'
import { ethers } from "ethers";

import { userContract } from "@/utils/constants";
import { toastError } from "@/utils/methods";
import { useToast } from "@chakra-ui/react";

const OwnerContext = createContext(null)

export const OwnerProvider = ({ children }) => {
  const [isOwnerConnected, setIsOwnerConnected] = useState(false)
  const { address, isConnected } = useAccount()
  const toast = useToast()

  const setUserCurrentlyConnected = async () => {
    try {
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = ethersProvider.getSigner()
      const contractInstance = new ethers.Contract(userContract.address, userContract.abi, signer)
      const contractOwner =  "0x"
  
      if(address == contractOwner){
        setIsOwnerConnected(true)
      } else {
        setIsOwnerConnected(false)
      }
    } catch (error) {
      toast(toastError("UserCreated", error.reason))    
    }
  }

  useEffect(()=>{
    if(isConnected){
      setUserCurrentlyConnected()
    }
  }, [isConnected, address])

  return (
    <OwnerContext.Provider value={{ isOwnerConnected }}>
      {children}
    </OwnerContext.Provider>
  )
}

export default OwnerContext;