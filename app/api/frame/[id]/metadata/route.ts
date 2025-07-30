// app/api/frame/[id]/metadata/route.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/constants'      // ↗ import here

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const base = SITE_URL                             // ↗ use it here
  return NextResponse.json({
    name: `Tomagotchu #${id}`,
    description: 'Your uniquely generated on-chain creature.',
    image: `${base}/api/frame/${id}`,
    frame: {
      version: 'vNext',
      image: `${base}/api/frame/${id}`,
      buttons: [
        { label: 'Mint Yours',      action: 'link', target: `${base}/mint` },
        { label: 'View Collection', action: 'link', target: `${base}/myo` }
      ],
      post_url: `${base}/mint`
    }
  })
}
