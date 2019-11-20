import { TeamBattle } from '../Team/TeamBattle';
import { BattleBattle } from '../Battle/BattleBattle';
import { CharacterBattle } from '../Character/CharacterBattle';

/**
 * 阵营(战斗状态)
 */

export class FactionBattle extends Object {
    teams: Array<TeamBattle>;
    name: string;
    /**阵营所处的战斗 */
    battle?: BattleBattle;
    constructor() {
        super();
        this.teams = new Array<TeamBattle>(0);
        this.name = '';
        this.battle = undefined;
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
}
