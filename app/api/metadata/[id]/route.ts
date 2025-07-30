// app/api/metadata/[id]/route.ts (or [id].ts for legacy)

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
  }

  const traits = getTraits(id)
  const image = generateImage(traits)

  const metadata = {
    name: `Tomagotchu #${id}`,
    description: 'A unique on-chain Tomagotchu. Mint yours on Base!',
    image: `data:image/svg+xml;utf8,${encodeURIComponent(image)}`,
    attributes: [
      { trait_type: 'Color', value: traits.color.name, rarity: traits.color.rarity },
      { trait_type: 'Shape', value: traits.shape.name, rarity: traits.shape.rarity },
      { trait_type: 'Animal', value: traits.animal.name, rarity: traits.animal.rarity }
    ]
  }

  return NextResponse.json(metadata)
}
