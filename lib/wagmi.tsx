'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, WagmiConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'
import { publicProvider } from 'wagmi/providers/public'
import type { ReactNode } from 'react'

const queryClient = new QueryClient()

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    injected(),
    walletConnect({
      projectId: '8d389a211728bfed10834a260898662e'
    })
  ],
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  }
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
