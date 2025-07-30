// lib/tomagotchu.ts
import { Address, PublicClient, getContract } from "viem";
import { TOMAGOTCHU_CONTRACT } from "./contract";

export async function getTraitsFor(
  publicClient: PublicClient,
  tokenId: bigint,
  owner: Address
) {
  const contract = getContract({
    abi: TOMAGOTCHU_CONTRACT.abi,
    address: TOMAGOTCHU_CONTRACT.address,
    client: publicClient
  });

  const traits = await contract.read.generateTraits([tokenId, owner]);
  return {
    color: traits[0],
    shape: traits[1],
    animal: traits[2]
  };
}
