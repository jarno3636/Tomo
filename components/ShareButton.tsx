'use client'

import { useEffect } from 'react'

type Props = {
  tokenId: number
}

export default function ShareButton({ tokenId }: Props) {
  const shareText = `I just minted Tomagotchu #${tokenId}! 🐸✨\n\nTry it yourself: tomagotchu.xyz`

  const handleClick = () => {
    const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}`
    window.open(castUrl, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
    >
      Share to Farcaster 🚀
    </button>
  )
}
