import { Team } from '../types/Team'

export default function getTeamFromName(teams: Team[], teamName: string) {
  const team = teams.filter(
    (team) => team.name.toLowerCase() === teamName.toLowerCase(),
  )

  return team[0]
}
