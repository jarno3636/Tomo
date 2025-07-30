// app/page.tsx
'use client'

import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import MintButton from '@/components/MintButton'
import TraitReveal from '@/components/TraitReveal'

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const [tokenId, setTokenId] = useState<number | null>(null)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">🐸 Tomagotchu</h1>

      {!isConnected ? (
        <Connect />
      ) : (
        <>
          <MintButton onMint={(id: number) => setTokenId(id)} />
          {tokenId !== null && <TraitReveal tokenId={tokenId} />}
        </>
      )}
    </main>
  )
}

function Connect() {
  const { connect, connectors, isLoading, error } = useConnect({
    connectors: [
      new InjectedConnector(),
      new WalletConnectConnector({ options: { projectId: 'YOUR_PROJECT_ID' } }),
    ]
  })

  return (
    <div className="flex flex-col space-y-2 items-center">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          disabled={!connector.ready || isLoading}
          onClick={() => connect({ connector })}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
        </button>
      ))}
      {error && <p className="mt-2 text-red-500 text-sm">Error: {error.message}</p>}
    </div>
  )
}
