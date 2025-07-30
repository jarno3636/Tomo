// components/TraitReveal.tsx
'use client'

import { useEffect, useState } from 'react'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'
import { SITE_URL } from '@/lib/constants'

type Props = {
  tokenId: number
}

export default function TraitReveal({ tokenId }: Props) {
  const [image, setImage] = useState<string | null>(null)
  const [traits, setTraits] = useState<ReturnType<typeof getTraits> | null>(null)

  useEffect(() => {
    const t = getTraits(tokenId)
    setTraits(t)
    setImage(generateImage(t))
  }, [tokenId])

  if (!traits || !image) return null

  return (
    <div className="text-center mt-6">
      <div
        className="mx-auto w-[250px] h-[250px] border shadow bg-white p-2"
        dangerouslySetInnerHTML={{ __html: image }}
      />
      <h2 className="text-xl font-bold mt-2">Tomagotchu #{tokenId}</h2>
      <p className="text-sm text-gray-600">
        {traits.color.name} • {traits.shape.name} • {traits.animal.name}
      </p>
      <a
        href={`${SITE_URL}/frame/${tokenId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-blue-600 underline"
      >
        View Frame ↗
      </a>
    </div>
  )
}
