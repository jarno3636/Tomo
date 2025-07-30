'use client'

import { useState } from 'react'

type Props = {
  tokenId: number
}

export default function ShareButton({ tokenId }: Props) {
  const [copied, setCopied] = useState(false)

  const shareText = `I just minted Tomagotchu #${tokenId}! 🐸✨\n\nMint yours: https://tomagotchu.xyz\n\n#Tomagotchu #OnChainNFT #Farcaster`

  const handleClick = () => {
    const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`
    if (typeof window !== 'undefined') {
      window.open(castUrl, '_blank')
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
    >
      {copied ? 'Copied & Shared! ✅' : 'Share to Farcaster 🚀'}
    </button>
  )
}
