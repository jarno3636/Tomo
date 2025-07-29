import { getTraits } from './traits'

export function generateImage(traits: ReturnType<typeof getTraits>): string {
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <rect width="100%" height="100%" fill="${traits.color.name.toLowerCase()}" />
  <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle"
        font-size="28" fill="white" font-family="Arial">
    ${traits.shape.name}
  </text>
  <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle"
        font-size="28" fill="white" font-family="Arial">
    ${traits.animal.name}
  </text>
</svg>
`
}
