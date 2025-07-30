import { ImageResponse } from '@vercel/og'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const runtime = 'edge'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const tokenId = parseInt(params.id)
  if (isNaN(tokenId)) {
    return new Response('Invalid token ID', { status: 400 })
  }

  const traits = getTraits(tokenId)
  const svg = generateImage(traits)

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
        <div
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{ width: 200, height: 200 }}
        />
        <p style={{ fontSize: 24, marginTop: 20 }}>Tomagotchu #{tokenId}</p>
      </div>
    ),
    {
      width: 600,
      height: 400
    }
  )
}
