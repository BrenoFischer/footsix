import { Match } from './Match'

export interface OnGoingMatch {
  state: string
  activeMatch: Match | null
}
