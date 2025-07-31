// app/collection/page.tsx
'use client'

import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import { publicClient } from '@/lib/wagmi'
import Image from 'next/image'
import TomagotchuABI from '@/lib/TomagotchuABI'
import { CONTRACT_ADDRESS } from '@/lib/constants'

type NFT = {
  tokenId: number
  traits: { color: number; shape: number; animal: number }
  rarity: { color: string; shape: string; animal: string }
}

export default function CollectionPage() {
  const { address, isConnected } = useAccount()
  const [nfts, setNfts]       = useState<NFT[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isConnected || !address) return
    setLoading(true)
    ;(async () => {
      const results: NFT[] = []
      for (let tokenId = 0; tokenId < 10000; tokenId++) {
        try {
          const owner = await readContract(publicClient, {
            address: CONTRACT_ADDRESS,
            abi:     TomagotchuABI,
            functionName: 'ownerOf',
            args: [BigInt(tokenId)],
          })
          if (String(owner).toLowerCase() === address.toLowerCase()) {
            const [color, shape, animal] = (await readContract(publicClient, {
              address: CONTRACT_ADDRESS,
              abi:     TomagotchuABI,
              functionName: 'generateTraits',
              args: [BigInt(tokenId), address as `0x${string}`],
            })) as [number, number, number]

            const getRarity = (t: number) =>
              t < 6 ? 'common' : t < 9 ? 'rare' : 'legendary'

            results.push({
              tokenId,
              traits: { color, shape, animal },
              rarity: {
                color: getRarity(color),
                shape: getRarity(shape),
                animal: getRarity(animal),
              },
            })
          }
        } catch {
          // skip missing tokens
        }
      }
      setNfts(results)
      setLoading(false)
    })()
  }, [address, isConnected])

  return (
    <div>…same UI as before…</div>
  )
}
