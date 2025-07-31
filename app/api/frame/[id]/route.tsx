// app/api/frame/[id]/route.ts
import { ImageResponse } from '@vercel/og'
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

  // turn the SVG into a data-URI so <img> can render it
  const svgBase64 = Buffer.from(svg).toString('base64')
  const imageUrl = `data:image/svg+xml;base64,${svgBase64}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          fontFamily: 'monospace',
        }}
      >
        <img
          src={imageUrl}
          width={200}
          height={200}
          alt={`Tomagotchu #${tokenId}`}
        />
        <p style={{ marginTop: 20, fontSize: 24 }}>
          Tomagotchu #{tokenId}
        </p>
      </div>
    ),
    {
      width: 600,
      height: 400,
    }
  )
}
