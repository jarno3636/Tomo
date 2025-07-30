// app/frame/index.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function FrameLanding() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gradient-to-b from-white to-violet-100">
      <h1 className="text-4xl font-bold mb-4">🎉 Tomagotchu Frames</h1>
      <p className="mb-6 text-lg text-gray-700 max-w-md">
        Every Tomagotchu NFT has a unique Farcaster Frame. Mint one, then share your collectible with a dynamic cast image.
      </p>
      <Image
        src="/og/tomagotchu-og.png"
        alt="Tomagotchu"
        width={600}
        height={314}
        className="rounded shadow-md mb-6"
      />
      <Link
        href="/mint"
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition"
      >
        Mint a Tomagotchu 🐸
      </Link>
    </div>
  )
}
