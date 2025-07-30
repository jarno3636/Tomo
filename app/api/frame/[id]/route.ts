// app/api/frame/[id]/route.ts
import { ImageResponse } from '@vercel/og'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const runtime = 'edge'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const tokenId = parseInt(params.id, 10)
  if (isNaN(tokenId)) {
    return new Response('Invalid token ID', { status: 400 })
  }

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
          fontFamily: 'monospace'
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: svg }} />
        <p style={{ marginTop: 20, fontSize: 24 }}>Tomagotchu #{tokenId}</p>
      </div>
    ),
    { width: 600, height: 400 }
  )
}
