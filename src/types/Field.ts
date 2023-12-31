import { Player } from './Player'

export interface Quadrant {
  playersOnQuadrant: Player[]
}

export interface Row {
  0: Quadrant
  1: Quadrant
  2: Quadrant
  3: Quadrant
}

export type Field = {
  0: Row
  1: Row
  2: Row
  3: Row
  4: Row
  5: Row
  6: Row
}
