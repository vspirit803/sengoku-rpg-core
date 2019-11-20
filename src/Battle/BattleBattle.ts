import { FactionBattle } from '../Faction/FactionBattle';
import { CharacterBattle } from '../Character/CharacterBattle';
import { EventCenter } from '../EventCenter/EventCenter';

/**
 * 战斗(战斗状态)
 */
export class BattleBattle extends Object {
    factions: Array<FactionBattle>; //玩家所在的阵营固定为factions[0],每个阵营都是互为敌对关系
    eventCenter: EventCenter;
    constructor() {
        super();
        this.factions = new Array<FactionBattle>(0);
        this.eventCenter = new EventCenter();
    }

    get characters(): Array<CharacterBattle> {
        return this.factions
            .map((eachFaction) => {
                return eachFaction.characters;
            })
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            });
    }
}
