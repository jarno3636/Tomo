import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { TOMAGOTCHU_ABI, TOMAGOTCHU_ADDRESS } from '@/contracts/tomagotchu';

const client = createPublicClient({
  chain: mainnet,
  transport: http()
});

export async function GET(req: NextRequest) {
  const tokenId = req.nextUrl.searchParams.get('tokenId');
  const user = req.nextUrl.searchParams.get('user');
  if (!tokenId || !user) return new NextResponse('Missing params', { status: 400 });

  const traits = await client.readContract({
    address: TOMAGOTCHU_ADDRESS,
    abi: TOMAGOTCHU_ABI,
    functionName: 'generateTraits',
    args: [BigInt(tokenId), user as `0x${string}`]
  });

  return NextResponse.json({ color: traits[0], shape: traits[1], animal: traits[2] });
}
