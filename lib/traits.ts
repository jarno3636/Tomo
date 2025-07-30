type Trait = {
  name: string
  rarity: 'Common' | 'Rare' | 'Legendary'
}

const colorTraits: Trait[] = [
  { name: 'Blue', rarity: 'Common' },
  { name: 'Green', rarity: 'Common' },
  { name: 'Pink', rarity: 'Common' },
  { name: 'Orange', rarity: 'Common' },
  { name: 'Yellow', rarity: 'Common' },
  { name: 'Gray', rarity: 'Common' },
  { name: 'Red', rarity: 'Rare' },
  { name: 'Purple', rarity: 'Rare' },
  { name: 'Teal', rarity: 'Rare' },
  { name: 'Rainbow', rarity: 'Legendary' }
]

const shapeTraits: Trait[] = [
  { name: 'Round', rarity: 'Common' },
  { name: 'Oval', rarity: 'Common' },
  { name: 'Square', rarity: 'Common' },
  { name: 'Triangle', rarity: 'Common' },
  { name: 'Star', rarity: 'Common' },
  { name: 'Heart', rarity: 'Common' },
  { name: 'Diamond', rarity: 'Rare' },
  { name: 'Spiral', rarity: 'Rare' },
  { name: 'Hexagon', rarity: 'Rare' },
  { name: 'Crystal', rarity: 'Legendary' }
]

const animalTraits: Trait[] = [
  { name: 'Frog', rarity: 'Common' },
  { name: 'Cat', rarity: 'Common' },
  { name: 'Dog', rarity: 'Common' },
  { name: 'Duck', rarity: 'Common' },
  { name: 'Fish', rarity: 'Common' },
  { name: 'Bunny', rarity: 'Common' },
  { name: 'Fox', rarity: 'Rare' },
  { name: 'Panda', rarity: 'Rare' },
  { name: 'Penguin', rarity: 'Rare' },
  { name: 'Dragon', rarity: 'Legendary' }
]

export function getTraits(tokenId: number) {
  const seed = tokenId + 1337 // Keep it deterministic and unique

  function getIndex(seed: number, offset: number): number {
    const hash = (BigInt(seed) * BigInt(offset + 1)) % BigInt(10)
    return Number(hash)
  }

  return {
    color: colorTraits[getIndex(seed, 0)],
    shape: shapeTraits[getIndex(seed, 1)],
    animal: animalTraits[getIndex(seed, 2)]
  }
}
