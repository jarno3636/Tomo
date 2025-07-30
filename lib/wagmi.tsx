'use client'

import React, { ReactNode } from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'viem/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { http } from 'wagmi/transports/http'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider(), http()]
)

// 2. Create the wagmi config with connectors
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({ chains, options: { projectId: '8d389a211728bfed10834a260898662e' } })
  ],
  publicClient,
  webSocketPublicClient
})

// 3. React Query client
const queryClient = new QueryClient()

// 4. Export chains for your Connect button
export { chains }

// 5. Export a wrapper for your App
export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  )
}
