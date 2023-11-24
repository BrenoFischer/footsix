import { Match } from './Match'

export type OnGoingMatch =
  | { state: 'initiated'; match: Match }
  | { state: 'completed'; match: Match }
