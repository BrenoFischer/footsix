import { PositionOnField } from './PositionOnField'

export interface Player {
  id: string
  name: string
  atributes: {
    pass: number
    strike: number
    defense: number
    tackle: number
  }
  position: string
  positionOnField: PositionOnField
  team: string
}
