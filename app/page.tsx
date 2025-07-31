// app/page.tsx
'use client'

import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'
import MintButton from '@/components/MintButton'
import TraitReveal from '@/components/TraitReveal'

export default function HomePage() {
  const { isConnected } = useAccount()
  const [tokenId, setTokenId] = useState<number | null>(null)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">🐸 Tomagotchu</h1>
      {!isConnected ? <Connect /> : (
        <>
          <MintButton onMint={setTokenId} />
          {tokenId !== null && <TraitReveal tokenId={tokenId} />}
        </>
      )}
    </main>
  )
}

function Connect() {
  const { connect, connectors, error, isLoading } = useConnect()
  return (
    <div className="space-x-2">
      {connectors.map((c) => (
        <button
          key={c.id}
          disabled={!c.ready || isLoading}
          onClick={() => connect({ connector: c })}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {c.name}{!c.ready && ' (unsupported)'}
        </button>
      ))}
      {error && <p className="mt-2 text-red-500">{error.message}</p>}
    </div>
  )
}
