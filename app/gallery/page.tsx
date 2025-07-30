// app/gallery/page.tsx
'use client'

import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export default function GalleryPage() {
  const items = Array.from({ length: 200 }, (_, i) => i)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tomagotchu Gallery</h1>
      <p className="mb-6 text-gray-600">
        Preview the first 200 Tomagotchus generated on‑chain. Each image and trait is
        100% deterministic from the contract logic.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((id) => {
          const traits = getTraits(id)
          const svg = generateImage(traits)
          const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

          return (
            <div
              key={id}
              className="border p-3 rounded shadow text-center bg-white"
            >
              <p className="font-semibold mb-1">#{id}</p>
              <img
                src={dataUri}
                alt={`Tomagotchu #${id}`}
                className="mx-auto w-full h-auto"
              />
              <div className="text-xs mt-2 space-y-1">
                <p>
                  <strong>Color:</strong> {traits.color.name}
                </p>
                <p>
                  <strong>Shape:</strong> {traits.shape.name}
                </p>
                <p>
                  <strong>Animal:</strong> {traits.animal.name}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
