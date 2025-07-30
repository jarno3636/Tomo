export const metadata = {
  title: 'Tomagotchu | On-Chain NFT Fun',
  description: 'Mint your own Tomagotchu NFT — 100% on-chain, colorful, and adorable!',
  openGraph: {
    title: 'Tomagotchu | On-Chain NFT Fun',
    description: 'Mint your own Tomagotchu NFT — 100% on-chain, colorful, and adorable!',
    url: 'https://tomagotchu.xyz',
    siteName: 'Tomagotchu',
    images: [
      {
        url: 'https://tomagotchu.xyz/og.png',
        width: 1200,
        height: 630,
        alt: 'Tomagotchu — Mint On-Chain NFT Pets',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomagotchu | On-Chain NFT Fun',
    description: 'Mint your on-chain Tomagotchu NFT!',
    images: ['https://tomagotchu.xyz/og.png'],
    creator: '@your_handle_here', // Optional
  },
}
// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tomagotchu | On-Chain NFT Pet',
  description: 'Mint your own Tomagotchu — a fully on-chain NFT pet with unique traits!',
  openGraph: {
    title: 'Tomagotchu | On-Chain NFT Pet',
    description: 'Mint your own Tomagotchu — a fully on-chain NFT pet with unique traits!',
    url: 'https://tomagotchu.xyz',
    siteName: 'Tomagotchu',
    images: [
      {
        url: 'https://tomagotchu.xyz/og/tomagotchu-og.png',
        width: 1200,
        height: 630,
        alt: 'Tomagotchu Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomagotchu | On-Chain NFT Pet',
    description: 'Mint your own Tomagotchu — a fully on-chain NFT pet with unique traits!',
    images: ['https://tomagotchu.xyz/og/tomagotchu-og.png.PNG'],
    creator: '@yourhandle', // Optional
  },
  metadataBase: new URL('https://tomagotchu.xyz'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
