// app/api/traits/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { TOMAGOTCHU_CONTRACT } from '@/lib/contract'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export async function GET(req: NextRequest) {
  const tokenIdParam = req.nextUrl.searchParams.get('tokenId')
  const user = req.nextUrl.searchParams.get('user')
  if (!tokenIdParam || !user) {
    return new NextResponse('Missing params', { status: 400 })
  }

  const tokenId = BigInt(tokenIdParam)
  const result = (await client.readContract({
    address: TOMAGOTCHU_CONTRACT.address,
    abi: TOMAGOTCHU_CONTRACT.abi,
    functionName: 'generateTraits',
    args: [tokenId, user as `0x${string}`],
  })) as [number, number, number]

  const [color, shape, animal] = result
  return NextResponse.json({ color, shape, animal })
}
