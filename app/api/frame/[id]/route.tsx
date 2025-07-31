// app/api/frame/[id]/route.tsx
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

// This tells Vercel to run this as an edge function
export const config = {
  runtime: 'edge',
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const tokenId = parseInt(params.id, 10)
  if (isNaN(tokenId)) {
    return new Response('Invalid token ID', { status: 400 })
  }

  // Generate the same SVG you’re already creating on-chain
  const traits = getTraits(tokenId)
  const svg = generateImage(traits)

  // Turn it into a data URI so <ImageResponse> can inline it
  const svgB64 = Buffer.from(svg).toString('base64')
  const imageUrl = `data:image/svg+xml;base64,${svgB64}`

  // Compose a 600×400 OG image
  return new ImageResponse(
    (
      <div
        style={{
          width: 600,
          height: 400,
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
        <p style={{ fontSize: 24, marginTop: 20 }}>
          Tomagotchu #{tokenId}
        </p>
      </div>
    ),
    { width: 600, height: 400 }
  )
}
