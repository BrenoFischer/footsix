import { uniqueNamesGenerator } from 'unique-names-generator'
import { Player } from '../types/Player'

// For more information on Unique Name Generator, see https://www.npmjs.com/package/unique-names-generator

function generateRandomAtributeValue(min = 1, max = 13) {
  return Math.floor(Math.random() * (max - min) + min) // Max is exclusive and Min is inclusive
}

export function createPlayer(position: string, team = ''): Player {
  const playerNames = [
    'Han Solo',
    'Jabba The Hutt',
    'R2-D2',
    'Luke Skywalker',
    'Princess Leia Organa',
    'Don Juan',
  ]

  const player: Player = {
    name: uniqueNamesGenerator({ dictionaries: [playerNames] }),
    atributes: {
      pass: generateRandomAtributeValue(),
      defense: generateRandomAtributeValue(),
      strike: generateRandomAtributeValue(),
      tackle: generateRandomAtributeValue(),
    },
    position,
    team,
  }

  return player
}
