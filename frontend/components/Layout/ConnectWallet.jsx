import { Flex } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ConnectWallet() {
  const { isConnected } = useAccount()
  return (
    <Flex 
      direction="column" 
      grow={isConnected ? "0" : "1"} 
      alignItems="center" 
      justifyContent="center"
    >
      <ConnectButton accountStatus="avatar" label='CONNECT WALLET' />
    </Flex>    
  )
}