'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { parseEther, encodeFunctionData } from 'viem'

type Props = {
  onMint: (tokenId: number) => void
}

export default function MintButton({ onMint }: Props) {
  const [hash, setHash] = useState<`0x${string}` | null>(null)
  const [loading, setLoading] = useState(false)
  const [tokenId, setTokenId] = useState<number | null>(null)

  const { writeContractAsync } = useWriteContract()

  const handleMint = async () => {
    setLoading(true)
    try {
      const txHash = await writeContractAsync({
        address: '0xYourContractAddressHere', // replace with deployed address
        abi: [
          {
            name: 'mint',
            type: 'function',
            stateMutability: 'payable',
            inputs: [],
            outputs: []
          }
        ],
        functionName: 'mint',
        value: parseEther('0.001')
      })

      setHash(txHash)
    } catch (err) {
      console.error('Mint failed', err)
      setLoading(false)
    }
  }

  const { isLoading: waitingTx } = useWaitForTransactionReceipt({
    hash,
    enabled: !!hash,
    onSuccess() {
      const mintedId = Math.floor(Math.random() * 10000) // simulate for now
      setTokenId(mintedId)
      onMint(mintedId)
      setLoading(false)
    }
  })

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleMint}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        disabled={loading || waitingTx}
      >
        {loading || waitingTx ? 'Minting...' : 'Mint Tomagotchu (0.001 ETH)'}
      </button>
    </div>
  )
}
