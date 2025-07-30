// app/api/traits/route.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { TOMAGOTCHU_ADDRESS, TOMAGOTCHU_ABI } from '@/lib/contracts'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

export async function GET(request: NextRequest) {
  const tokenIdParam = request.nextUrl.searchParams.get('tokenId')
  const userParam = request.nextUrl.searchParams.get('user')
  if (!tokenIdParam || !userParam) {
    return NextResponse.json(
      { error: 'Missing tokenId or user query parameter' },
      { status: 400 }
    )
  }

  let tokenId: bigint
  try {
    tokenId = BigInt(tokenIdParam)
  } catch {
    return NextResponse.json({ error: 'Invalid tokenId' }, { status: 400 })
  }

  try {
    // generateTraits returns [uint8 color, uint8 shape, uint8 animal]
    const [color, shape, animal] = (await publicClient.readContract({
      address: TOMAGOTCHU_ADDRESS,
      abi: TOMAGOTCHU_ABI,
      functionName: 'generateTraits',
      args: [tokenId, userParam as `0x${string}`],
    })) as [number, number, number]

    return NextResponse.json({ color, shape, animal })
  } catch (err) {
    console.error('generateTraits failed', err)
    return NextResponse.json({ error: 'Contract call failed' }, { status: 500 })
  }
}
