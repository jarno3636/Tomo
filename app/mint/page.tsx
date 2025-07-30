use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { contractConfig } from '@/lib/contract'

export default function MintPage() {
  const { address, isConnected } = useAccount()
  const [hash, setHash] = useState<`0x${string}` | null>(null)
  const [preview, setPreview] = useState<number | null>(null)
  const [totalMinted, setTotalMinted] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const { writeContract } = useWriteContract()
  const { isPending, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleMint = async () => {
    setLoading(true)
    try {
      writeContract(
        {
          ...contractConfig,
          functionName: 'mint',
          value: parseEther('0.001'),
        },
        {
          onSuccess(data) {
            setHash(data.hash)
            const fakeId = Math.floor(Math.random() * 10000)
            setPreview(fakeId)
          },
        }
      )
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Mint a Tomagotchu</h1>

      {!isConnected && <p>Please connect your wallet to mint.</p>}

      {isConnected && (
        <>
          <button
            onClick={handleMint}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
            disabled={isPending || loading}
          >
            {loading || isPending ? 'Minting...' : 'Mint for 0.001 ETH'}
          </button>

          {isSuccess && (
            <div className="mt-4 p-4 border rounded bg-green-100 text-green-700">
              Successfully minted!
            </div>
          )}

          {preview !== null && (
            <div className="mt-6">
              <p className="mb-2 font-medium">Trait Preview (Random):</p>
              <div className="p-6 border rounded text-center bg-gray-100 text-4xl">🐸</div>
              <p className="mt-2 text-sm text-gray-500">Token ID (simulated): #{preview}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
