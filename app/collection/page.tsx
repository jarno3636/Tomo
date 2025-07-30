'use client'

import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import Image from 'next/image'

// ABI should live in lib/TomagotchuABI.ts and be a default export
import TomagotchuABI from '@/lib/TomagotchuABI'

// Your constants file is in lib/constants.ts
import { CONTRACT_ADDRESS } from '@/lib/constants'

// Generate trait names/rarity from on‑chain numbers
import { generateTraits } from '@/lib/traits'

type NFT = {
  tokenId: number
  traits: { color: number; shape: number; animal: number }
  rarity: { color: string; shape: string; animal: string }
}

export default function CollectionPage() {
  const { address, isConnected } = useAccount()
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isConnected || !address) return
    setLoading(true)

    ;(async () => {
      const results: NFT[] = []
      for (let tokenId = 0; tokenId < 10000; tokenId++) {
        try {
          const owner = await readContract({
            address: CONTRACT_ADDRESS,
            abi: TomagotchuABI,
            functionName: 'ownerOf',
            args: [tokenId]
          })

          if (String(owner).toLowerCase() === address.toLowerCase()) {
            // generateTraits returns { color, shape, animal }
            const { color, shape, animal } = await readContract({
              address: CONTRACT_ADDRESS,
              abi: TomagotchuABI,
              functionName: 'generateTraits',
              args: [tokenId, address]
            }) as { color: number; shape: number; animal: number }

            // convert numeric trait to rarity string
            const getRarity = (t: number) => (t < 6 ? 'common' : t < 9 ? 'rare' : 'legendary')

            results.push({
              tokenId,
              traits: { color, shape, animal },
              rarity: {
                color: getRarity(color),
                shape: getRarity(shape),
                animal: getRarity(animal)
              }
            })
          }
        } catch {
          // skip non‑existent tokens
        }
      }
      setNfts(results)
      setLoading(false)
    })()
  }, [address, isConnected])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🎒 My Tomagotchus</h1>
      {!isConnected ? (
        <p className="text-gray-500">Connect your wallet to view your NFTs.</p>
      ) : loading ? (
        <p>Loading your collection...</p>
      ) : nfts.length === 0 ? (
        <p>No Tomagotchus found in your wallet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nfts.map((nft) => (
            <div
              key={nft.tokenId}
              className="border rounded-lg p-4 bg-white/10 backdrop-blur shadow"
            >
              <div className="mb-2 font-semibold">Token #{nft.tokenId}</div>
              <div className="text-sm space-y-1">
                <div>
                  🎨 Color: {nft.traits.color}{' '}
                  <span className="ml-2">{nft.rarity.color}</span>
                </div>
                <div>
                  🔷 Shape: {nft.traits.shape}{' '}
                  <span className="ml-2">{nft.rarity.shape}</span>
                </div>
                <div>
                  🐾 Animal: {nft.traits.animal}{' '}
                  <span className="ml-2">{nft.rarity.animal}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
