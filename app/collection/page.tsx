// app/collection/page.tsx
"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { readContract } from "../../wagmi/core";
import { TomagotchuABI } from "../../lib/TomagotchuABI";
import { generateTraitsFromSeed } from "../../utils/generateTraits";
import { CONTRACT_ADDRESS } from "../../constants";
import Image from "next/image";

type NFT = {
  tokenId: number;
  traits: {
    color: number;
    shape: number;
    animal: number;
  };
  rarity: {
    color: string;
    shape: string;
    animal: string;
  };
};

export default function CollectionPage() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;
    const fetchNFTs = async () => {
      setLoading(true);
      const results: NFT[] = [];

      try {
        // Estimate: loop through 0–9999 to find tokens owned by user
        for (let tokenId = 0; tokenId < 10000; tokenId++) {
          const owner: string = await readContract({
            abi: TomagotchuABI,
            address: CONTRACT_ADDRESS,
            functionName: "ownerOf",
            args: [tokenId],
          });

          if (owner.toLowerCase() === address.toLowerCase()) {
            const traits = await readContract({
              abi: TomagotchuABI,
              address: CONTRACT_ADDRESS,
              functionName: "generateTraits",
              args: [tokenId, address],
            });

            const [color, shape, animal] = traits as [number, number, number];

            results.push({
              tokenId,
              traits: { color, shape, animal },
              rarity: {
                color: getRarity(color),
                shape: getRarity(shape),
                animal: getRarity(animal),
              },
            });
          }
        }
      } catch (err) {
        console.error("Error fetching NFTs", err);
      }

      setNfts(results);
      setLoading(false);
    };

    fetchNFTs();
  }, [address]);

  const getRarity = (trait: number) => {
    if (trait < 6) return "common";
    else if (trait < 9) return "rare";
    else return "legendary";
  };

  const rarityEmoji = {
    common: "🔹",
    rare: "🔸",
    legendary: "🌟",
  };

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
                  🎨 Color: {nft.traits.color}{" "}
                  <span className="ml-2">
                    {rarityEmoji[nft.rarity.color]} {nft.rarity.color}
                  </span>
                </div>
                <div>
                  🔷 Shape: {nft.traits.shape}{" "}
                  <span className="ml-2">
                    {rarityEmoji[nft.rarity.shape]} {nft.rarity.shape}
                  </span>
                </div>
                <div>
                  🐾 Animal: {nft.traits.animal}{" "}
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
  );
}
