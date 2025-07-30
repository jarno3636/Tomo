import type { TraitInfo } from './traits'

type Traits = {
  color: TraitInfo
  shape: TraitInfo
  animal: TraitInfo
}

export function generateImage(traits: Traits): string {
  const { color, shape, animal } = traits

  return `
<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  ${color.name === 'Rainbow' ? `
    <defs>
      <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF0000" />
        <stop offset="20%" stop-color="#FF7F00" />
        <stop offset="40%" stop-color="#FFFF00" />
        <stop offset="60%" stop-color="#00FF00" />
        <stop offset="80%" stop-color="#0000FF" />
        <stop offset="100%" stop-color="#8B00FF" />
      </linearGradient>
    </defs>` : ''
  }
  <rect width="100%" height="100%" fill="${color.hex}" rx="30" />
  <text x="200" y="180" font-size="28" fill="white" text-anchor="middle" font-family="monospace">${shape.name}</text>
  <text x="200" y="240" font-size="28" fill="white" text-anchor="middle" font-family="monospace">${animal.name}</text>
</svg>
  `.trim()
}
