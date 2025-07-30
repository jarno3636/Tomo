// app/frame/[id]/route.ts

import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const tokenId = parseInt(params.id)
  if (isNaN(tokenId)) {
    return NextResponse.json({ error: 'Invalid token ID' }, { status: 400 })
  }

  const traits = getTraits(tokenId)
  const imageSvg = generateImage(traits)
  const imageUrl = `data:image/svg+xml;utf8,${encodeURIComponent(imageSvg)}`

  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Frame-Image': imageUrl,
      'Frame-Post-Url': `https://tomagotchu.xyz/mint`,
      'Frame-Button-Text': 'Mint Yours!',
    }
  })
}
