// app/mint/page.tsx
'use client'

import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

const contractAddress = '0xacc4b4d66bc7dcab0ae15ee0effece546ceb68d2'
const contractABI = [  // Minimal ABI for mint function
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

export default function MintPage() {
  const { address, isConnected } = useAccount()
  const [txHash, setTxHash] = useState<string | null>(null)

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: 'mint',
    value: parseEther('0.001'),
    enabled: isConnected,
  })

  const { data, write, isLoading, isSuccess } = useContractWrite({
    ...config,
    onSuccess(data) {
      setTxHash(data.hash)
    }
  })

  const { isLoading: txLoading, isSuccess: txSuccess } = useWaitForTransaction({
    hash: txHash,
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <h1 className="text-3xl font-bold mb-4">Mint Your Tomagotchu</h1>
      <ConnectButton />
      {isConnected && (
        <button
          onClick={() => write?.()}
          disabled={isLoading || txLoading || !write}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isLoading || txLoading ? 'Minting...' : 'Mint for 0.001 ETH'}
        </button>
      )}
      {txSuccess && (
        <div className="mt-4 text-green-600">Minted! 🎉 Check your collection.</div>
      )}
    </div>
  )
}
