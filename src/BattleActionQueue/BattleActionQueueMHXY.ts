import { CharacterBattle } from '@src/Character/CharacterBattle';
import { BattleActionQueueBase } from './BattleActionQueueBase';
import { Event } from '@src/EventCenter/Event';
import { TriggerTiming } from '@src/EventCenter/TriggerTiming';
import { BattleBattle } from '@src/Battle';

/**
 * 战斗行动序列(梦幻西游型,每个回合所有角色按速度快慢依次行动)
 */
export class BattleActionQueueMHXY implements BattleActionQueueBase {
    battle: BattleBattle;
    roundCount: number;
    private actionQueue: Array<CharacterBattle>;

    constructor(battle: BattleBattle) {
        this.battle = battle;
        this.actionQueue = new Array<CharacterBattle>(0);
        this.roundCount = 0;
    }

    getNext(): CharacterBattle {
        let nextCharacter: CharacterBattle;
        do {
            if (this.actionQueue.length === 0) {
                //该回合已行动完毕,应该开始下一个回合
                if (this.roundCount) {
                    this.battle.eventCenter.trigger(
                        //回合结束
                        new Event({
                            type: TriggerTiming.RoundEnd,
                            source: { uuid: Symbol('BattleActionQueueMHXY') },
                            data: { roundCount: this.roundCount },
                        }),
                    );
                }
                this.actionQueue.push(
                    ...this.battle.characters
                        .filter((eachCharacter) => {
                            return eachCharacter.isAlive;
                        })
                        .sort((a, b) => {
                            //速度从大到小排序
                            return b.properties.speed.battleValue - a.properties.speed.battleValue;
                        }),
                );
                this.battle.eventCenter.trigger(
                    //回合开始
                    new Event({
                        type: TriggerTiming.RoundStart,
                        source: { uuid: Symbol('BattleActionQueueMHXY') },
                        data: { roundCount: this.roundCount },
                    }),
                );
                this.roundCount++;
            }
            nextCharacter = this.actionQueue.shift()!;
        } while (!nextCharacter.isAlive);
        return nextCharacter;
    }
}
