// app/frame/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'
import { FRAME_BUTTONS, SITE_URL } from '@/lib/constants'

type Params = { params: { id: string } }

export async function generateMetadata({ params }: Params) {
  const id = parseInt(params.id, 10)
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
      'fc:frame:button:1': FRAME_BUTTONS[0].label,
      'fc:frame:button:1:action': FRAME_BUTTONS[0].action,
      'fc:frame:button:1:target': `${SITE_URL}${FRAME_BUTTONS[0].target}`,
      'fc:frame:button:2': FRAME_BUTTONS[1].label,
      'fc:frame:button:2:action': FRAME_BUTTONS[1].action,
      'fc:frame:button:2:target': `${SITE_URL}${FRAME_BUTTONS[1].target}`,
      'fc:frame:post_url': `${SITE_URL}/mint`
    }
  }
}

export default function FramePage({ params }: Params) {
  const id = parseInt(params.id, 10)
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
