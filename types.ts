export interface node {
  setIndex: number,
  charIndex: number,
  name: string,
  sets: Boolean[],
  charNumber: number,
  nextNodes: string[]
}

export const sets = [
  "abcdefghijklmnopqrstuvwxyz",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "1234567890"
]