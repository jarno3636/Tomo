import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const DOMAIN = 'https://tomagotchu.xyz' // Replace with your domain

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  return NextResponse.json({
    name: `Tomagotchu #${id}`,
    description: 'Your uniquely generated on-chain creature.',
    image: `${DOMAIN}/api/frame/${id}`, // dynamic image endpoint
    frame: {
      version: 'vNext',
      image: `${DOMAIN}/api/frame/${id}`,
      buttons: [
        {
          label: 'Mint Yours',
          action: 'link',
          target: `${DOMAIN}/mint`
        },
        {
          label: 'View Collection',
          action: 'link',
          target: `${DOMAIN}/myo`
        }
      ],
      post_url: `${DOMAIN}/mint`
    }
  })
}
