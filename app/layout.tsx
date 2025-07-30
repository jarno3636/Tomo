// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tomagotchu | On-Chain NFT Mint',
  description: 'Mint fully on-chain Tomagotchu NFTs with unique traits. Built on Ethereum.',
  openGraph: {
    title: 'Tomagotchu | On-Chain NFT Mint',
    description: 'Each Tomagotchu is 100% generated on-chain with rare and legendary traits.',
    images: [
      {
        url: '/og-tomagotchu.png',
        width: 1200,
        height: 630,
        alt: 'Tomagotchu NFT',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomagotchu | On-Chain NFT Mint',
    description: 'Each Tomagotchu is 100% generated on-chain with rare and legendary traits.',
    images: ['/og-tomagotchu.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-full border-b bg-white px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-bold text-xl text-green-600">🐸 Tomagotchu</Link>
          <nav className="flex gap-4 text-sm text-gray-700">
            <Link href="/mint">Mint</Link>
            <Link href="/myo">My Collection</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/info">Info</Link>
          </nav>
        </header>
        <main className="min-h-screen bg-gray-50">{children}</main>
        <footer className="border-t text-center p-4 text-sm text-gray-500">
          © 2025 Tomagotchu • Fully On-Chain Frogs 🐸
        </footer>
      </body>
    </html>
  )
}
