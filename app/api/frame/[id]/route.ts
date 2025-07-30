// app/api/frame/[id]/route.ts

import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const runtime = 'edge'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const tokenId = parseInt(params.id)
  if (isNaN(tokenId)) {
    return new Response('Invalid token ID', { status: 400 })
  }

  const traits = getTraits(tokenId)
  const svg = generateImage(traits)
  const svgBase64 = Buffer.from(svg).toString('base64')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontSize: 32,
          color: 'white',
          fontFamily: 'monospace',
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${svgBase64}`}
          width={300}
          height={300}
          alt={`Tomagotchu #${tokenId}`}
        />
        <p style={{ marginTop: 20 }}>{traits.color.name} • {traits.shape.name} • {traits.animal.name}</p>
      </div>
    ),
    {
      width: 600,
      height: 600,
    }
  )
}
