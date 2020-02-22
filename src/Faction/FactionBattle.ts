import { TeamNormal, TeamBattle } from '@src/Team';
import { BattleBattle } from '@src/Battle';
import { CharacterBattle } from '@src/Character';
import { FactionConfiguration } from './FactionConfiguration';
import { Game } from '@src/Game';

/**
 * 阵营(战斗状态)
 */
export class FactionBattle {
    teams: Array<TeamBattle>;
    name: string;
    /**阵营所处的战斗 */
    battle?: BattleBattle;
    constructor(factionConfiguration: FactionConfiguration, game: Game) {
        this.name = factionConfiguration.name;
        this.teams = [];
        this.addTeams(
            ...factionConfiguration.teams.map(
                (eachTeamConfiguration) => new TeamBattle(new TeamNormal(eachTeamConfiguration, game), game),
            ),
        );
    }

    /** 阵营是否"存活",只要阵营至少有一队伍存活,则阵营存活 */
    get isAlive(): boolean {
        return this.teams.some((eachTeam) => eachTeam.isAlive);
    }

    get characters(): Array<CharacterBattle> {
        return this.teams
            .map((eachTeam) => {
                return eachTeam.members;
            })
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            });
    }

    addTeams(...teams: Array<TeamBattle>): void {
        teams.forEach((eachTeam) => {
            this.teams.push(eachTeam);
            eachTeam.setFaction(this);
        });
    }

    /**
     * 设置玩家队伍
     * @param team 玩家的队伍
     */
    setPlayerTeam(team: TeamBattle): void {
        this.teams[0] = team;
        team.setFaction(this);
        team.setBattle(this.battle!);
    }

    setBattle(battle: BattleBattle): void {
        this.battle = battle;
        this.teams.forEach((eachTeam) => {
            eachTeam.setBattle(battle);
        });
    }
}
