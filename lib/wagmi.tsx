'use client'
import { configureChains, createConfig, WagmiConfig, publicProvider } from 'wagmi'
import { mainnet } from 'viem/chains'
import { MetaMaskConnector } from '@wagmi/connectors/metaMask'
import { WalletConnectConnector } from '@wagmi/connectors/walletConnect'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

// 1. Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    publicProvider()
  ]
)

// 2. Create the wagmi config with connectors
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '8d389a211728bfed10834a260898662e'
      }
    })
  ],
  publicClient,
  webSocketPublicClient
})

// 3. React Query client
const queryClient = new QueryClient()

// 4. Export your App wrapper
export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
