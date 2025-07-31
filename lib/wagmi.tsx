// lib/wagmi.tsx
'use client'

import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'viem/chains'
import { publicProvider } from '@wagmi/core/providers/public'
import { injected, walletConnect } from '@wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    injected({ chains }),
    walletConnect({ chains, options: { projectId: 'YOUR_PROJECT_ID' } })
  ],
  publicClient,
  webSocketPublicClient
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
