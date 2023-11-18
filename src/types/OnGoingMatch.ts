import { Match } from './Tournment/Match'

export interface OnGoingMatch {
  state: string
  activeMatch: Match | null
}
