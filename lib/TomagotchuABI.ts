// lib/TomagotchuABI.ts

export const TomagotchuABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' },
    ],
    name: 'generateTraits',
    outputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'uint8', name: '', type: 'uint8' },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// add this so your default imports keep working
export default TomagotchuABI
