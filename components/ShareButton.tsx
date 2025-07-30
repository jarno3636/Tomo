// components/ShareButton.tsx
'use client'

import { useState } from 'react'

type Props = {
  tokenId: number
}

export default function ShareButton({ tokenId }: Props) {
  const [copied, setCopied] = useState(false)

  const shareText = `I just minted Tomagotchu #${tokenId}! 🐸✨

Mint yours: https://tomagotchu.xyz

#Tomagotchu #OnChainNFT #Farcaster`

  const handleClick = () => {
    const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(
      shareText
    )}`

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareText)
        .then(() => setCopied(true))
        .catch(() => {
          console.error('Clipboard write failed')
        })
        .finally(() => {
          window.open(castUrl, '_blank', 'noopener,noreferrer')
          setTimeout(() => setCopied(false), 2000)
        })
    } else {
      // Fallback if clipboard not supported
      window.open(castUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Share your new Tomagotchu on Farcaster"
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
    >
      {copied ? 'Copied & Shared! ✅' : 'Share to Farcaster 🚀'}
    </button>
  )
}
