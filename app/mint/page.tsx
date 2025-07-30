// app/mint/page.tsx
'use client'

import { useState } from 'react'
import { parseEther } from 'viem'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import Confetti from '@/components/Confetti'
import ShareButton from '@/components/ShareButton'
import { CONTRACT_ADDRESS } from '@/lib/constants'
import TomagotchuABI from '@/lib/TomagotchuABI'

export default function MintPage() {
  const [hash, setHash] = useState<`0x${string}` | null>(null)
  const [tokenId, setTokenId] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const { writeContractAsync } = useWriteContract({
    address: CONTRACT_ADDRESS,
    abi: TomagotchuABI,
    functionName: 'mint',
    value: parseEther('0.001'),
  })

  const { isLoading: waitingTx } = useWaitForTransactionReceipt({
    hash,
    enabled: !!hash,
    onSuccess() {
      // For now we simulate the new token ID
      const newId = Math.floor(Math.random() * 10000)
      setTokenId(newId)

      const shareText = `I just minted Tomagotchu #${newId}! 🐸✨\n\nTry it yourself: https://tomagotchu.xyz`
      navigator.clipboard.writeText(shareText).then(() => setCopied(true))
    },
  })

  const handleMint = async () => {
    try {
      const txHash = await writeContractAsync()
      setHash(txHash)
    } catch (err) {
      console.error('Mint failed:', err)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Mint Your Tomagotchu 🐸</h1>

      {tokenId === null ? (
        <button
          onClick={handleMint}
          disabled={waitingTx}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {waitingTx ? 'Minting...' : 'Mint (0.001 ETH)'}
        </button>
      ) : (
        <>
          <p className="mt-4 text-xl">Success! 🎉</p>
          <p className="mb-2">You minted Tomagotchu #{tokenId}</p>
          {copied && <p className="text-sm text-green-500">Share text copied to clipboard ✅</p>}
          <ShareButton tokenId={tokenId} />
        </>
      )}

      {tokenId !== null && <Confetti />}
    </div>
  )
}
