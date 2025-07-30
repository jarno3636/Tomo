// lib/generateImage.ts

import type { TraitInfo } from './traits'

type Traits = {
  color: TraitInfo
  shape: TraitInfo
  animal: TraitInfo
}

export function generateImage(traits: Traits): string {
  const { color, shape, animal } = traits

  return `
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color.hex}" rx="20" />
  <text x="100" y="60" font-size="18" fill="black" text-anchor="middle" font-family="monospace">${shape.name}</text>
  <text x="100" y="110" font-size="18" fill="black" text-anchor="middle" font-family="monospace">${animal.name}</text>
</svg>
  `.trim()
}
