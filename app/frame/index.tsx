// app/frame/index.tsx

import { NextResponse } from 'next/server'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tokenId = Math.floor(Math.random() * 10000)
  const traits = getTraits(tokenId)
  const imageSvg = generateImage(traits)
  const imageUrl = `data:image/svg+xml;utf8,${encodeURIComponent(imageSvg)}`

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
      'Refresh': '0; url=/frame/' + tokenId,
      'Location': '/frame/' + tokenId,
      'Frame-Image': imageUrl,
      'Frame-Post-Url': `https://tomagotchu.xyz/frame/${tokenId}`,
      'Frame-Button-Text': 'Mint One!',
    }
  })
}
