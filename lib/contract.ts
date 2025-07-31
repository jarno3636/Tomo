// lib/contract.ts

import type { Address } from 'viem'

export const TOMAGOTCHU_CONTRACT = {
  address: "0xacc4b4d66bc7dcab0ae15ee0effece546ceb68d2" as const as Address,
  abi: [
    /* … same as above … */
  ] as const
}

export const contractConfig = {
  address: TOMAGOTCHU_CONTRACT.address,
  abi: TOMAGOTCHU_CONTRACT.abi,
}
