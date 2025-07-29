'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base } from 'viem/chains'
import { WagmiProvider, http } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

const config = getDefaultConfig({
  appName: 'Tomagotchu',
  projectId: '8d389a211728bfed10834a260898662e', // optional, get from cloud.walletconnect.com
  chains: [base],
  transports: {
    [base.id]: http()
  }
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
