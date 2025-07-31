// lib/traits.ts

export type TraitInfo = {
  name: string
  rarity: 'Common' | 'Rare' | 'Legendary'
  hex: string
}

const colorTraits: TraitInfo[] = [
  { name: 'Blue', rarity: 'Common', hex: '#3B82F6' },
  { name: 'Green', rarity: 'Common', hex: '#10B981' },
  { name: 'Pink', rarity: 'Common', hex: '#EC4899' },
  { name: 'Orange', rarity: 'Common', hex: '#F97316' },
  { name: 'Yellow', rarity: 'Common', hex: '#EAB308' },
  { name: 'Gray', rarity: 'Common', hex: '#9CA3AF' },
  { name: 'Red', rarity: 'Rare', hex: '#EF4444' },
  { name: 'Purple', rarity: 'Rare', hex: '#8B5CF6' },
  { name: 'Teal', rarity: 'Rare', hex: '#14B8A6' },
  { name: 'Rainbow', rarity: 'Legendary', hex: 'url(#rainbow)' },
]

const shapeTraits: TraitInfo[] = [
  { name: 'Round', rarity: 'Common', hex: '#000000' },
  { name: 'Oval', rarity: 'Common', hex: '#000000' },
  { name: 'Square', rarity: 'Common', hex: '#000000' },
  { name: 'Triangle', rarity: 'Common', hex: '#000000' },
  { name: 'Star', rarity: 'Common', hex: '#000000' },
  { name: 'Heart', rarity: 'Common', hex: '#000000' },
  { name: 'Diamond', rarity: 'Rare', hex: '#000000' },
  { name: 'Spiral', rarity: 'Rare', hex: '#000000' },
  { name: 'Hexagon', rarity: 'Rare', hex: '#000000' },
  { name: 'Crystal', rarity: 'Legendary', hex: '#000000' },
]

const animalTraits: TraitInfo[] = [
  { name: 'Frog', rarity: 'Common', hex: '#000000' },
  { name: 'Cat', rarity: 'Common', hex: '#000000' },
  { name: 'Dog', rarity: 'Common', hex: '#000000' },
  { name: 'Duck', rarity: 'Common', hex: '#000000' },
  { name: 'Fish', rarity: 'Common', hex: '#000000' },
  { name: 'Bunny', rarity: 'Common', hex: '#000000' },
  { name: 'Fox', rarity: 'Rare', hex: '#000000' },
  { name: 'Panda', rarity: 'Rare', hex: '#000000' },
  { name: 'Penguin', rarity: 'Rare', hex: '#000000' },
  { name: 'Dragon', rarity: 'Legendary', hex: '#000000' },
]

export function getTraits(tokenId: number) {
  const seed = tokenId + 1337

  function getIndex(s: number, offset: number): number {
    return Number((BigInt(s) * BigInt(offset + 1)) % BigInt(10))
  }

  return {
    color: colorTraits[getIndex(seed, 0)],
    shape: shapeTraits[getIndex(seed, 1)],
    animal: animalTraits[getIndex(seed, 2)],
  }
}
