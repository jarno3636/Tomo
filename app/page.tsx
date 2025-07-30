'use client'

import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import MintButton from '@/components/MintButton'
import TraitReveal from '@/components/TraitReveal'

export default function HomePage() {
  const { isConnected } = useAccount()
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
  const { connect, connectors, error, isLoading } = useConnect({
    connectors: [injected(), walletConnect({ projectId: '8d389a211728bfed10834a260898662e' })],
  })

  return (
    <div className="space-x-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          disabled={!connector.ready || isLoading}
          onClick={() => connect({ connector })}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {connector.name}
        </button>
      ))}
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  )
}
