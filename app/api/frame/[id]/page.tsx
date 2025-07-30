// app/frame/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

type Params = { params: { id: string } }

export async function generateMetadata({ params }: Params) {
  const id = parseInt(params.id)
  if (isNaN(id)) return notFound()

  const traits = getTraits(id)
  const image = generateImage(traits)
  const svgUrl = `data:image/svg+xml;utf8,${encodeURIComponent(image)}`
  const title = `Tomagotchu #${id}`
  const description = `Traits: ${traits.color.name}, ${traits.shape.name}, ${traits.animal.name}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: svgUrl }],
      type: 'website'
    },
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': svgUrl,
      'fc:frame:button:1': 'Mint Yours',
      'fc:frame:button:1:action': 'link',
      'fc:frame:button:1:target': 'https://tomagotchu.xyz/mint',
      'fc:frame:button:2': 'View Collection',
      'fc:frame:button:2:action': 'link',
      'fc:frame:button:2:target': 'https://tomagotchu.xyz/myo',
      'fc:frame:post_url': 'https://tomagotchu.xyz/mint'
    }
  }
}

export default function FramePage({ params }: Params) {
  const id = parseInt(params.id)
  const traits = getTraits(id)
  const image = generateImage(traits)

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-2">Tomagotchu #{id}</h1>
      <div
        className="w-[300px] h-[300px] border shadow bg-white p-2"
        dangerouslySetInnerHTML={{ __html: image }}
      />
      <p className="mt-2 text-gray-600">
        {traits.color.name} • {traits.shape.name} • {traits.animal.name}
      </p>
    </div>
  )
}
