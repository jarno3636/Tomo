export type Trait = { name: string; rarity: 'Common' | 'Rare' | 'Legendary' }

const traitPool: Record<'color' | 'shape' | 'animal', Trait[]> = {
  color: [
    { name: 'Red', rarity: 'Common' },
    { name: 'Blue', rarity: 'Common' },
    { name: 'Green', rarity: 'Common' },
    { name: 'Yellow', rarity: 'Common' },
    { name: 'Orange', rarity: 'Common' },
    { name: 'Purple', rarity: 'Common' },
    { name: 'Cyan', rarity: 'Rare' },
    { name: 'Magenta', rarity: 'Rare' },
    { name: 'Lime', rarity: 'Rare' },
    { name: 'Gold', rarity: 'Legendary' }
  ],
  shape: [
    { name: 'Circle', rarity: 'Common' },
    { name: 'Square', rarity: 'Common' },
    { name: 'Triangle', rarity: 'Common' },
    { name: 'Hexagon', rarity: 'Common' },
    { name: 'Blob', rarity: 'Common' },
    { name: 'Star', rarity: 'Common' },
    { name: 'Diamond', rarity: 'Rare' },
    { name: 'Spiral', rarity: 'Rare' },
    { name: 'Wave', rarity: 'Rare' },
    { name: 'Cube', rarity: 'Legendary' }
  ],
  animal: [
    { name: 'Cat', rarity: 'Common' },
    { name: 'Dog', rarity: 'Common' },
    { name: 'Frog', rarity: 'Common' },
    { name: 'Bird', rarity: 'Common' },
    { name: 'Fish', rarity: 'Common' },
    { name: 'Mouse', rarity: 'Common' },
    { name: 'Dragon', rarity: 'Rare' },
    { name: 'Sloth', rarity: 'Rare' },
    { name: 'Phoenix', rarity: 'Rare' },
    { name: 'Unicorn', rarity: 'Legendary' }
  ]
}

export function getTraits(id: number) {
  const pseudoRand = (salt: string) =>
    parseInt(
      String(BigInt(`0x${Buffer.from(`${id}-${salt}`).toString('hex')}`) % BigInt(100))
    )

  const pick = (type: 'color' | 'shape' | 'animal', salt: string) => {
    const rand = pseudoRand(salt)
    if (rand < 60) return traitPool[type][rand % 6]
    else if (rand < 90) return traitPool[type][6 + (rand % 3)]
    else return traitPool[type][9]
  }

  return {
    color: pick('color', 'color'),
    shape: pick('shape', 'shape'),
    animal: pick('animal', 'animal')
  }
}
