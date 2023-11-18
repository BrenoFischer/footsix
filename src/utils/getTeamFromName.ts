import { Game } from '../types/Game'

export default function getTeamFromName(activeGame: Game, teamName: string) {
  if (activeGame.myTeam.name.toLowerCase() === teamName.toLowerCase())
    return activeGame.myTeam

  const team = activeGame.gameTeams.filter(
    (team) => team.name.toLowerCase() === teamName.toLowerCase(),
  )

  return team[0]
}
