import { FactionBattle } from '../Faction/FactionBattle';
import { CharacterBattle } from '../Character/CharacterBattle';
import { EventCenter } from '../EventCenter/EventCenter';
import { BattleActionQueueMHXY } from '../BattleActionQueue/BattleActionQueueMHXY';
import { BattleActionQueueBase } from '../BattleActionQueue/BattleActionQueueBase';

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

    addFactions(...factions: Array<FactionBattle>): void {
        factions.forEach((eachFaction) => {
            this.factions.push(eachFaction);
            eachFaction.setBattle(this);
        });
    }

    async start(): Promise<void> {
        const battleActionQueue: BattleActionQueueBase = new BattleActionQueueMHXY();
        battleActionQueue.battle = this;
        battleActionQueue.init();
        while (true) {
            const character = battleActionQueue.getNext();
            character.action();
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });

            const enemies = this.factions.filter((eachFaction) => {
                return eachFaction !== this.factions[0];
            });

            if (!enemies.some((eachFaction) => eachFaction.isAlive)) {
                console.log('赢了');
                break;
            }
            if (!this.factions[0].isAlive) {
                //所有友军死亡
                console.log('输了');
                break;
            }
        }
    }
}
