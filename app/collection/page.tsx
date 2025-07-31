// app/collection/page.tsx
'use client'

import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { readContract } from '@wagmi/core'
import { publicClient } from '@/lib/wagmi'
import TomagotchuABI from '@/lib/TomagotchuABI'
import { CONTRACT_ADDRESS } from '@/lib/constants'

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
    if (!address || !isConnected) return

    const fetchNFTs = async () => {
      setLoading(true)
      const results: NFT[] = []

      for (let tokenId = 0; tokenId < 10000; tokenId++) {
        try {
          // pass publicClient as first arg
          const owner = await readContract(publicClient, {
            address: CONTRACT_ADDRESS,
            abi: TomagotchuABI,
            functionName: 'ownerOf',
            args: [BigInt(tokenId)],
          })

          if (String(owner).toLowerCase() === address.toLowerCase()) {
            const [color, shape, animal] = (await readContract(publicClient, {
              address: CONTRACT_ADDRESS,
              abi: TomagotchuABI,
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
          // skip invalid tokenIds
        }
      }

      setNfts(results)
      setLoading(false)
    }

    fetchNFTs()
  }, [address, isConnected])

  const rarityEmoji: Record<string, string> = {
    common: '🔹',
    rare: '🔸',
    legendary: '🌟',
  }

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
          {nfts.map(nft => (
            <div
              key={nft.tokenId}
              className="border rounded-lg p-4 bg-white/10 backdrop-blur shadow"
            >
              <div className="mb-2 font-semibold">Token #{nft.tokenId}</div>
              <div className="text-sm space-y-1">
                <div>
                  🎨 Color: {nft.traits.color}{' '}
                  <span className="ml-2">
                    {rarityEmoji[nft.rarity.color]} {nft.rarity.color}
                  </span>
                </div>
                <div>
                  🔷 Shape: {nft.traits.shape}{' '}
                  <span className="ml-2">
                    {rarityEmoji[nft.rarity.shape]} {nft.rarity.shape}
                  </span>
                </div>
                <div>
                  🐾 Animal: {nft.traits.animal}{' '}
                  <span className="ml-2">
                    {rarityEmoji[nft.rarity.animal]} {nft.rarity.animal}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
