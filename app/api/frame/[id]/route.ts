import { ImageResponse } from 'next/og'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const runtime = 'edge'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tokenId = parseInt(params.id)
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
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fff',
          fontFamily: 'monospace',
          flexDirection: 'column'
        }}
      >
        <img src={imageUrl} width="200" height="200" alt={`Tomagotchu #${tokenId}`} />
        <p style={{ fontSize: 24, marginTop: 20 }}>Tomagotchu #{tokenId}</p>
      </div>
    ),
    {
      width: 600,
      height: 400
    }
  )
}
