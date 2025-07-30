// app/frame/page.tsx
import { getTraits } from '@/lib/traits'
import { generateImage } from '@/lib/generateImage'

export const dynamic = 'force-dynamic'

export default async function FramePreview() {
  const sampleTokenId = 1234
  const traits = getTraits(sampleTokenId)
  const image = generateImage(traits)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Farcaster Frame Preview</h1>
      <div className="bg-white p-4 border rounded shadow-lg max-w-xs">
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(image)}`}
          alt={`Tomagotchu #${sampleTokenId}`}
          className="w-full h-auto"
        />
        <p className="mt-2 text-center text-gray-700">Tomagotchu #{sampleTokenId}</p>
      </div>
    </div>
  )
}
