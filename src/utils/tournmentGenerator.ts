import { Match } from '../types/Match'
import { Tournment, TournmentRound } from '../types/Tournment/Tournment'
import { matchGenerator } from './matchGenerator'

function shiftTeamsGroups(halfTeams1: string[], halfTeams2: string[]) {
  // To create the Tournment matches rounds, its used single turn formula to match teams - every team face each other
  // This function will get half of the teams (halfTeams1) and
  // shift all the teams, but maintain fixed User Team ( halfTeams1[0] )
  // Also, it will shift all the other half of teams (halfTeams2)
  // If a Team is on the border of an array, and its shifted, it will go to the another Array
  // the shift is done clockwise, for example:
  // [1, 2, 3, 4] -> [1, 5, 2, 3]
  // [5, 6, 7, 8] -> [6, 7, 8, 4]
  const auxArray = halfTeams1

  const halfTeams1Shifted = [
    auxArray[0],
    halfTeams2[0],
    ...auxArray.slice(1, halfTeams1.length - 1),
  ]
  const halfTeams2Shifted = [
    ...halfTeams2.slice(1, halfTeams2.length),
    auxArray[auxArray.length - 1],
  ]

  return [halfTeams1Shifted, halfTeams2Shifted]
}

export function createTournment(teams: string[]): Tournment {
  const totalNumberOfRounds = teams.length - 1

  // single turn formula to match teams - every team face each other
  let halfTeams1 = teams.slice(0, teams.length / 2) // get half of the teams
  let halfTeams2 = teams.slice(teams.length / 2, teams.length) // get the other half of the teams
  let tournmentRounds: TournmentRound[] = []
  let matches: Match[]

  for (let i = 0; i < teams.length - 1; i++) {
    matches = []
    halfTeams1.forEach((team, index) => {
      matches.push(matchGenerator(team, halfTeams2[index], i + 1))
    })
    tournmentRounds = [...tournmentRounds, { matches }]
    const teamsShifted = shiftTeamsGroups(halfTeams1, halfTeams2)
    halfTeams1 = teamsShifted[0]
    halfTeams2 = teamsShifted[1]
  }

  const newTournment: Tournment = {
    name: 'Carioca',
    totalNumberOfRounds,
    currentRound: 0,
    tournmentRounds,
    teams,
  }

  return newTournment
}
