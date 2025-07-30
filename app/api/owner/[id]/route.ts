// app/api/owner/[id]/route.ts
import { NextResponse } from 'next/server'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { TOMAGOTCHU_CONTRACT } from '@/lib/contract'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const owner = await client.readContract({
    address: TOMAGOTCHU_CONTRACT.address,
    abi: TOMAGOTCHU_CONTRACT.abi,
    functionName: 'ownerOf',
    args: [BigInt(params.id)]
  })
  return NextResponse.json({ owner })
}
