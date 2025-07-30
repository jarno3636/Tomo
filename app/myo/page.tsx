'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { contractConfig } from '../../lib/contract'
import { readContract } from '@wagmi/core'
import { generateTraits } from '../../lib/traits'

export default function MyCollectionPage() {
  const { address, isConnected } = useAccount()
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTokens = async () => {
      if (!address || !isConnected) return
      setLoading(true)

      const promises = []
      for (let i = 0; i < 10000; i++) {
        promises.push(
          readContract({
            ...contractConfig,
            functionName: 'ownerOf',
            args: [BigInt(i)],
          }).then(owner => ({ id: i, owner })).catch(() => null)
        )
      }

      const owned = await Promise.all(promises)
      const userTokens = owned.filter(t => t && t.owner === address).map(t => t!.id)
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
        {tokenIds.map((id) => {
          const [color, shape, animal] = generateTraits(id, address!)
          return (
            <li key={id} className="border p-4 rounded text-center">
              <p>Token #{id}</p>
              <p className="mt-2 text-xl">🎨 {color} | 🧩 {shape} | 🐾 {animal}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
