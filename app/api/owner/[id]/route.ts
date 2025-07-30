import { NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { TOMAGOTCHU_ADDRESS, TOMAGOTCHU_ABI } from '@/lib/contracts'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const tokenId = BigInt(params.id)
  if (isNaN(Number(tokenId))) {
    return NextResponse.json({ error: 'Invalid token ID' }, { status: 400 })
  }

  const owner = await publicClient.readContract({
    address: TOMAGOTCHU_ADDRESS,
    abi: TOMAGOTCHU_ABI,
    functionName: 'ownerOf',
    args: [tokenId]
  })

  return NextResponse.json({ owner: String(owner) })
}
