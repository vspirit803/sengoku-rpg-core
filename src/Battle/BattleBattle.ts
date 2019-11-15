import { FactionBattle } from '../Faction/FactionBattle';

/**
 * 战斗(战斗状态)
 */
export class BattleBattle extends Object {
    factions: Array<FactionBattle>;//玩家所在的阵营固定为factions[0],每个阵营都是互为敌对关系

    constructor() {
        super();
        this.factions = new Array<FactionBattle>(0);
    }
}
