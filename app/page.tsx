// app/page.tsx
'use client'

import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
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
  const { connect } = useConnect()
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded"
      onClick={() =>
        connect({
          connector: new InjectedConnector(),
        })
      }
    >
      Connect Wallet
    </button>
  )
}
