import '@/styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { hardhat, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react'

import { OwnerProvider } from '@/contexts/ownerProvider';
import { NavigationProvider } from '@/contexts/NavigationProvider';
import theme from '@/utils/theme';

const { chains, provider } = configureChains(
  [goerli],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'SamaPaper',
  chains
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
})

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}  modalSize="compact">
        <ChakraProvider theme={theme}>
         <NavigationProvider>
          <OwnerProvider>
            <Component {...pageProps} />              
          </OwnerProvider>
         </NavigationProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
