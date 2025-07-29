'use client'

import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'
import ShareButton from './ShareButton'

type Props = {
  tokenId: number
}

export default function TraitReveal({ tokenId }: Props) {
  const traits = getTraits(tokenId)
  const image = generateImage(traits)

  return (
    <div className="mt-8 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-2">You minted Tomagotchu #{tokenId}</h2>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
        alt="Tomagotchu Image"
        className="w-full rounded shadow-lg my-4"
      />
      <ul className="text-left text-lg mb-4">
        <li><strong>Color:</strong> {traits.color.name} ({traits.color.rarity})</li>
        <li><strong>Shape:</strong> {traits.shape.name} ({traits.shape.rarity})</li>
        <li><strong>Animal:</strong> {traits.animal.name} ({traits.animal.rarity})</li>
      </ul>
      <ShareButton tokenId={tokenId} />
    </div>
  )
}
