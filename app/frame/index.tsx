// app/api/frame/index.tsx
import { NextResponse } from 'next/server'
import { SITE_URL, FRAME_BUTTONS } from '@/lib/constants'

export async function GET() {
  return NextResponse.json(
    {
      title: 'Tomagotchu Frame',
      description: 'Mint your own on-chain Tomagotchu NFT!',
      image: `${SITE_URL}/og/tomagotchu-og.png`,
      frame: {
        version: 'vNext',
        image: `${SITE_URL}/og/tomagotchu-og.png`,
        post_url: `${SITE_URL}/mint`,
        buttons: [
          {
            label: FRAME_BUTTONS[0].label,
            action: FRAME_BUTTONS[0].action,
            target: `${SITE_URL}${FRAME_BUTTONS[0].target}`
          },
          {
            label: FRAME_BUTTONS[1].label,
            action: FRAME_BUTTONS[1].action,
            target: `${SITE_URL}${FRAME_BUTTONS[1].target}`
          }
        ]
      }
    },
    { status: 200 }
  )
}
