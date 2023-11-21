import { Player } from './Player'

export interface Quadrant {
  playersOnQuadrant: Player[]
}

export interface Row {
  quadrants: Quadrant[]
}

export interface Field {
  rows: Row[]
}
