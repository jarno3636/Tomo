"use client";

import { useAccount, usePublicClient } from "wagmi";
import { useEffect, useState } from "react";
import { getTraitsFor } from "@/lib/tomagotchu";
import { formatEther } from "viem";
import { TOMAGOTCHU_CONTRACT } from "@/lib/contract";

export default function MyTomagotchus() {
  const { address } = useAccount();
  const client = usePublicClient();
  const [traitsList, setTraitsList] = useState<
    { tokenId: bigint; color: number; shape: number; animal: number }[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      if (!client || !address) return;

      const logs = await client.getLogs({
        address: TOMAGOTCHU_CONTRACT.address,
        event: {
          type: "event",
          name: "TomagotchuMinted",
          inputs: [
            { indexed: true, type: "address", name: "owner" },
            { indexed: true, type: "uint256", name: "tokenId" },
            { indexed: false, type: "uint8", name: "color" },
            { indexed: false, type: "uint8", name: "shape" },
            { indexed: false, type: "uint8", name: "animal" }
          ]
        },
        fromBlock: "earliest",
        toBlock: "latest"
      });

      const owned = logs
        .filter(log => log.args?.owner?.toLowerCase() === address.toLowerCase())
        .map(log => ({
          tokenId: BigInt(log.args!.tokenId as string),
          color: log.args!.color as number,
          shape: log.args!.shape as number,
          animal: log.args!.animal as number
        }));

      setTraitsList(owned);
    };

    fetch();
  }, [address, client]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Tomagotchus</h1>
      {traitsList.length === 0 ? (
        <p>You don’t own any Tomagotchus yet.</p>
      ) : (
        <ul className="space-y-3">
          {traitsList.map(({ tokenId, color, shape, animal }) => (
            <li
              key={tokenId.toString()}
              className="border p-4 rounded shadow bg-white text-sm"
            >
              <strong>ID:</strong> {tokenId.toString()} <br />
              <strong>Color:</strong> {color} <br />
              <strong>Shape:</strong> {shape} <br />
              <strong>Animal:</strong> {animal}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
