import { TeamNormal } from './TeamNormal';
import { CharacterBattle } from '../Character/CharacterBattle';
import { FactionBattle } from '../Faction/FactionBattle';
import { BattleBattle } from '../Battle/BattleBattle';

/**
 * 队伍(战斗状态)
 */
export class TeamBattle extends TeamNormal {
    members: Array<CharacterBattle>;
    /**队伍所处的阵营 */
    faction?: FactionBattle;
    /**队伍所处的战斗 */
    battle?: BattleBattle;
    /**指令点,用于施放技能 */
    orderPoint: number; //指令点,用于施放技能
    constructor() {
        super();
        this.members = new Array<CharacterBattle>(0);
        this.orderPoint = 0;
    }

    /** 队伍是否"存活",只要队伍至少有一人存活,则队伍存活 */
    get isAlive(): boolean {
        return this.members.some((eachMember) => eachMember.isAlive);
    }
}
