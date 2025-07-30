'use client'

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useState } from 'react'
import { parseEther } from 'viem'

type Props = {
  onMint: () => void
}

const CONTRACT_ADDRESS = '0xacc4b4d66bc7dcab0ae15ee0effece546ceb68d2'

export default function MintButton({ onMint }: Props) {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null)
  const [loading, setLoading] = useState(false)

  const { writeContractAsync } = useWriteContract()

  const handleMint = async () => {
    setLoading(true)
    try {
      const hash = await writeContractAsync({
        address: CONTRACT_ADDRESS,
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

      setTxHash(hash)
    } catch (err) {
      console.error('Mint failed:', err)
      setLoading(false)
    }
  }

  const { isLoading: waiting } = useWaitForTransactionReceipt({
    hash: txHash,
    enabled: !!txHash,
    onSuccess() {
      onMint()
      setLoading(false)
      setTxHash(null)
    },
    onError() {
      setLoading(false)
    }
  })

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleMint}
        className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        disabled={loading || waiting}
      >
        {loading || waiting ? 'Minting...' : 'Mint Tomagotchu (0.001 ETH)'}
      </button>
    </div>
  )
}
