export interface node {
  setIndex: number,
  charIndex: number,
  name: string,
  sets: boolean[],
  charNumber: number,
  nextNodes: string[],
  finalState: boolean
}

export const sets = [
  "abcdefghijklmnopqrstuvwxyz",
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "1234567890"
]