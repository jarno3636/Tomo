// app/api/frame/[id]/route.ts
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

  // build the exact same SVG string you use elsewhere
  const traits = getTraits(tokenId)
  const svg = generateImage(traits)

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      // cache for 5m on the edge
      'Cache-Control': 'public, max-age=300'
    }
  })
}
