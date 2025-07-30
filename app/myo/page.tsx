// app/myo/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { readContract } from '@wagmi/core'

// your contract config: { address: string; abi: unknown[] }
import { contractConfig } from '@/lib/contracts'

// your local trait‐naming helper
import { getTraits } from '@/lib/traits'

export default function MyCollectionPage() {
  const { address, isConnected } = useAccount()
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isConnected || !address) return

    setLoading(true)
    ;(async () => {
      // fetch ownerOf for 0–9999 in parallel
      const promises = Array.from({ length: 10000 }, (_, i) =>
        readContract({
          ...contractConfig,
          functionName: 'ownerOf',
          args: [BigInt(i)],
        })
          .then((owner: string) => (owner.toLowerCase() === address.toLowerCase() ? i : null))
          .catch(() => null)
      )

      const results = await Promise.all(promises)
      setTokenIds(results.filter((i): i is number => i !== null))
      setLoading(false)
    })()
  }, [address, isConnected])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎒 My Tomagotchus</h1>

      {!isConnected && <p className="text-gray-500">Connect your wallet to view your collection.</p>}
      {isConnected && loading && <p>Loading your NFTs…</p>}
      {isConnected && !loading && tokenIds.length === 0 && <p>You don’t own any yet. Mint one!</p>}

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {tokenIds.map((id) => {
          const { color, shape, animal } = getTraits(id)
          return (
            <li key={id} className="border p-4 rounded text-center">
              <p className="font-semibold">#{id}</p>
              <p className="mt-2 text-sm">
                🎨 {color.name} • 🧩 {shape.name} • 🐾 {animal.name}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
