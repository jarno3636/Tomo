// app/myo/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { contractConfig } from '@/lib/contract'
import { readContract } from '@wagmi/core'
import { getTraits } from '@/lib/traits'

export default function MyCollectionPage() {
  const { address, isConnected } = useAccount()
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTokens = async () => {
      if (!address || !isConnected) return
      setLoading(true)

      const checks = Array.from({ length: 10000 }, (_, i) =>
        readContract({
          ...contractConfig,
          functionName: 'ownerOf',
          args: [BigInt(i)],
        })
          .then(owner => ({ id: i, owner }))
          .catch(() => null)
      )

      const results = await Promise.all(checks)
      const userTokens = results.filter(r => r && r.owner === address).map(r => r!.id)
      setTokenIds(userTokens)
      setLoading(false)
    }

    fetchTokens()
  }, [address, isConnected])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Tomagotchus</h1>
      {!isConnected && <p>Please connect your wallet to view your collection.</p>}
      {isConnected && loading && <p>Loading your NFTs...</p>}
      {isConnected && !loading && tokenIds.length === 0 && <p>You don’t own any yet. Mint one!</p>}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {tokenIds.map(id => {
          const { color, shape, animal } = getTraits(id)
          return (
            <li key={id} className="border p-4 rounded text-center">
              <p>Token #{id}</p>
              <p className="mt-2 text-xl">
                🎨 {color.name} | 🧩 {shape.name} | 🐾 {animal.name}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
