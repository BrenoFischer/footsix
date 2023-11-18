import { Field } from './Field'
import { Player } from './Player'

export interface Round {
  field: Field
  playerWithTheBall: Player
}
