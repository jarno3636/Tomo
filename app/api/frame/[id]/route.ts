// app/api/frame/[id]/route.ts
import { ImageResponse } from 'next/og'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tokenId = parseInt(params.id, 10)
  if (isNaN(tokenId)) {
    return new Response('Invalid token ID', { status: 400 })
  }

  const traits = getTraits(tokenId)
  const svg = generateImage(traits)
  const svgBuffer = Buffer.from(svg)
  const base64 = svgBuffer.toString('base64')
  const imageUrl = `data:image/svg+xml;base64,${base64}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 600,
          height: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          fontSize: 24,
          fontFamily: 'monospace',
        }}
      >
        <img src={imageUrl} width="200" height="200" alt={`Tomagotchu #${tokenId}`} />
        <p style={{ marginTop: 20 }}>Tomagotchu #{tokenId}</p>
      </div>
    ),
    { width: 600, height: 400 }
  )
}
