"use client";

import { useAccount, useWriteContract } from "wagmi";
import { TOMAGOTCHU_CONTRACT } from "@/lib/contract";
import { useState } from "react";
import { parseEther } from "viem";

export default function MintPage() {
  const { isConnected } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();
  const [txHash, setTxHash] = useState("");

  const handleMint = async () => {
    try {
      const hash = await writeContractAsync({
        address: TOMAGOTCHU_CONTRACT.address,
        abi: TOMAGOTCHU_CONTRACT.abi,
        functionName: "mint",
        value: parseEther("0.001")
      });
      setTxHash(hash);
    } catch (e) {
      console.error("Mint failed", e);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Mint a Tomagotchu</h1>
      <button
        onClick={handleMint}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        disabled={isPending || !isConnected}
      >
        {isPending ? "Minting..." : "Mint for 0.001 ETH"}
      </button>
      {txHash && (
        <p className="mt-4 text-green-500">
          Minted!{" "}
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            className="underline"
          >
            View on Etherscan
          </a>
        </p>
      )}
    </div>
  );
}
