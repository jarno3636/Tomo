// app/info/page.tsx
export default function InfoPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">What is Tomagotchu?</h1>
      <p className="mb-4">
        Tomagotchu is a fully on-chain collectible NFT project that lets you mint randomized virtual pets with different traits like color, shape, and animal type. Each NFT is generated deterministically using on-chain logic, ensuring uniqueness and provable rarity.
      </p>
      <p className="mb-4">
        Once minted, your Tomagotchu lives forever on Ethereum. Traits are generated via the smart contract and visible through your connected wallet or our collection viewer.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Contract Info</h2>
      <ul className="list-disc ml-6 text-sm">
        <li><strong>Network:</strong> Ethereum Mainnet</li>
        <li><strong>Contract Address:</strong> <code>0xacc4b4d66bc7dcab0ae15ee0effece546ceb68d2</code></li>
        <li><strong>Mint Price:</strong> 0.001 ETH</li>
        <li><strong>Max Supply:</strong> 10,000 NFTs</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Traits</h2>
      <p className="mb-4">Each Tomagotchu has:</p>
      <ul className="list-disc ml-6">
        <li><strong>Color:</strong> Common, Rare, Legendary</li>
        <li><strong>Shape:</strong> Common, Rare, Legendary</li>
        <li><strong>Animal:</strong> Common, Rare, Legendary</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Get Involved</h2>
      <p>
        Mint yours now and show it off on Farcaster using the built-in sharing feature!
      </p>
    </div>
  )
}
