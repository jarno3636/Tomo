import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { TOMAGOTCHU_ABI, TOMAGOTCHU_ADDRESS } from '@/contracts/tomagotchu';

const client = createPublicClient({
  chain: mainnet,
  transport: http()
});

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const owner = await client.readContract({
    address: TOMAGOTCHU_ADDRESS,
    abi: TOMAGOTCHU_ABI,
    functionName: 'ownerOf',
    args: [BigInt(params.id)]
  });
  return new NextResponse(owner);
}
