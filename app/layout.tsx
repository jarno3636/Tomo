import './globals.css'
import { Providers } from '@/lib/wagmi'
import '@rainbow-me/rainbowkit/styles.css'

export const metadata = {
  title: 'Tomagotchu',
  description: 'Mint your own on-chain Tomagotchu on Farcaster.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
