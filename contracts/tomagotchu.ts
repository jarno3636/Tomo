export const TOMAGOTCHU_ADDRESS = '0xacc4b4d66bc7dcab0ae15ee0effece546ceb68d2';

export const TOMAGOTCHU_ABI = [
  {
    inputs: [],
    name: 'MINT_PRICE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalMinted',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'address', name: 'user', type: 'address' }
    ],
    name: 'generateTraits',
    outputs: [
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'uint8', name: '', type: 'uint8' },
      { internalType: 'uint8', name: '', type: 'uint8' }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: true, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { indexed: false, internalType: 'uint8', name: 'color', type: 'uint8' },
      { indexed: false, internalType: 'uint8', name: 'shape', type: 'uint8' },
      { indexed: false, internalType: 'uint8', name: 'animal', type: 'uint8' }
    ],
    name: 'TomagotchuMinted',
    type: 'event'
  }
];
