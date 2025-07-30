// app/my/page.tsx
'use client'

import { useAccount, useContractReads } from 'wagmi'
import { useEffect, useState } from 'react'

const contractAddress = '0xacc4b4d66bc7dcab0ae15ee0effece546ceb68d2'
const contractABI = [
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "uint256", "name": "index", "type": "uint256" }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
]

export default function MyCollectionPage() {
  const { address, isConnected } = useAccount()
  const [tokenIds, setTokenIds] = useState<number[]>([])

  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    if (!address || !isConnected) return

    const fetchNFTs = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, contractABI, provider)

      const bal = await contract.balanceOf(address)
      setBalance(Number(bal))

      const ids = []
      for (let i = 0; i < bal; i++) {
        const id = await contract.tokenOfOwnerByIndex(address, i)
        ids.push(Number(id))
      }
      setTokenIds(ids)
    }

    fetchNFTs()
  }, [address, isConnected])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">My Tomagotchus</h1>
      {!isConnected && <p>Please connect your wallet to view your NFTs.</p>}
      {isConnected && tokenIds.length === 0 && <p>You don’t own any yet. Mint one!</p>}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {tokenIds.map((id) => (
          <li key={id} className="border p-4 rounded text-center">
            <p>Token #{id}</p>
            <div className="mt-2 bg-gray-100 h-32 flex items-center justify-center">🐸 Placeholder</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
