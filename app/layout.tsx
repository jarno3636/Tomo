// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/lib/wagmi'

export const metadata: Metadata = {
  title: 'Tomagotchu | On-Chain NFT Pet',
  description: 'Mint your own Tomagotchu — a fully on-chain NFT pet with unique traits!',
  metadataBase: new URL('https://tomagotchu.xyz'),
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
    images: ['https://tomagotchu.xyz/og/tomagotchu-og.png'],
    creator: '@yourhandle',
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://tomagotchu.xyz/frame',
    'fc:frame:button:1': 'Mint Yours!',
    'fc:frame:post_url': 'https://tomagotchu.xyz/mint',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts for Inter & Roboto Mono */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Roboto+Mono&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
