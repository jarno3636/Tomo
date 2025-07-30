// app/api/frame/[id]/route.ts
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const runtime = 'edge'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const tokenId = parseInt(params.id, 10)
  if (isNaN(tokenId)) {
    return new Response('Invalid token ID', { status: 400 })
  }

  // 1) Generate the SVG string
  const svg = generateImage(getTraits(tokenId))

  // 2) Return it as a proper SVG response
  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' }
  })
}
