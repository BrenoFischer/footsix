import { Match } from '../types/Tournment/Match'
import { Tournment, TournmentRound } from '../types/Tournment/Tournment'
import { matchGenerator } from './matchGenerator'

export function createTournment(teams: string[]): Tournment {
  const totalNumberOfRounds = teams.length - 1

  // single turn formula to match teams - every team face each other
  let auxArrayHalfTeams1 = teams.slice(0, teams.length / 2) // get half of the teams
  let auxArrayHalfTeams2 = teams.slice(teams.length / 2, teams.length) // get the other half of the teams
  const rounds: TournmentRound[] = []
  let matches: Match[]

  const shiftArrays = () => {
    // shift all the teams, but maintain fix User Team -> auxArrayHalfTeams1[0]
    // the shift is done clockwise, for example:
    // [1, 2, 3, 4] -> [1, 5, 2, 3]
    // [5, 6, 7, 8] -> [6, 7, 8, 4]
    const auxArray = auxArrayHalfTeams1

    auxArrayHalfTeams1 = [
      auxArray[0],
      auxArrayHalfTeams2[0],
      ...auxArray.slice(1, auxArrayHalfTeams1.length - 1),
    ]
    auxArrayHalfTeams2 = [
      ...auxArrayHalfTeams2.slice(1, auxArrayHalfTeams2.length),
      auxArray[auxArray.length - 1],
    ]
  }

  for (let i = 0; i < teams.length - 2; i++) {
    // console.log(rounds)
    console.log(`Rodada: ${i + 1}`)
    console.log(`Array1: ${auxArrayHalfTeams1}`)
    console.log(`Array2: ${auxArrayHalfTeams2}`)
    matches = []
    auxArrayHalfTeams1.forEach((team, index) => {
      matches.push(matchGenerator(team, auxArrayHalfTeams2[index], i + 1))
    })
    rounds.push({ matches, round: i + 1 })
    shiftArrays()
  }

  const newTournment: Tournment = {
    name: 'Carioca',
    totalNumberOfRounds,
    currentRound: 0,
    rounds,
    teams,
  }

  return newTournment
}
