import { Match } from './Match'

export interface OnGoingMatch {
  state: string // 'initiated' | 'completed' | 'not initiated'
  activeMatch: Match | null
}
