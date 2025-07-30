// app/api/frame/[id]/route.ts
import { ImageResponse } from 'next/og'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const runtime = 'edge'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const tokenId = parseInt(params.id)
  if (isNaN(tokenId)) return new Response('Invalid token ID', { status: 400 })

  const traits = getTraits(tokenId)
  const svg = generateImage(traits)

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
        <div
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{ width: 200, height: 200 }}
        />
        <p style={{ marginTop: 20 }}>Tomagotchu #{tokenId}</p>
      </div>
    ),
    { width: 600, height: 400 }
  )
}
