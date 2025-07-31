'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getPublicClient } from '@wagmi/core'
import { TomagotchuABI, CONTRACT_ADDRESS } from '@/lib/constants'
import { getTraits } from '@/lib/traits'

export default function MyCollectionPage() {
  const { address, isConnected } = useAccount()
  const [tokenIds, setTokenIds] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isConnected || !address) return
    const client = getPublicClient()
    ;(async () => {
      setLoading(true)
      const owned: number[] = []
      for (let i = 0; i < 10000; i++) {
        try {
          const owner = await client.readContract({
            address: CONTRACT_ADDRESS,
            abi: TomagotchuABI,
            functionName: 'ownerOf',
            args: [BigInt(i)],
          })
          if ((owner as string).toLowerCase() === address.toLowerCase()) {
            owned.push(i)
          }
        } catch {
          // skip
        }
      }
      setTokenIds(owned)
      setLoading(false)
    })()
  }, [address, isConnected])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Tomagotchus</h1>
      {!isConnected && (
        <p>Please connect your wallet to view your collection.</p>
      )}
      {isConnected && loading && <p>Loading your NFTs...</p>}
      {isConnected && !loading && tokenIds.length === 0 && (
        <p>You don’t own any yet. Mint one!</p>
      )}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {tokenIds.map((id) => {
          const { color, shape, animal } = getTraits(id)
          return (
            <li
              key={id}
              className="border p-4 rounded text-center"
            >
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
