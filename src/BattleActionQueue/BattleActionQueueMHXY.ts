import { BattleBattle } from '../Battle/BattleBattle';
import { CharacterBattle } from '../Character/CharacterBattle';
import { BattleActionQueueBase } from './BattleActionQueueBase';
import { Event } from '../EventCenter/Event';

/**
 * 战斗行动序列(梦幻西游型,每个回合所有角色按速度快慢依次行动)
 */
export class BattleActionQueueMHXY extends BattleActionQueueBase {
    private actionQueue: Array<CharacterBattle>;
    private roundCount: number;

    constructor() {
        super();
        this.actionQueue = new Array<CharacterBattle>(0);
        this.roundCount = 0;
    }

    init(): void {
        if (!this.battle) {
            throw Error('战斗行动序列生成器初始化失败!未绑定battle.');
        }
    }

    getNext(): CharacterBattle {
        if (!this.battle) {
            throw Error('获取下一行动角色失败!未绑定battle.');
        }
        let nextCharacter: CharacterBattle;
        do {
            if (this.actionQueue.length === 0) {
                //该回合已行动完毕,应该开始下一个回合
                if (this.roundCount) {
                    this.battle.eventCenter.trigger(
                        //回合结束
                        new Event({
                            type: 'RoundEnd',
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
                        type: 'RoundStart',
                        source: { uuid: Symbol('BattleActionQueueMHXY') },
                        data: { roundCount: this.roundCount },
                    }),
                );
            }
            nextCharacter = this.actionQueue.shift()!;
        } while (!nextCharacter.isAlive);
        return nextCharacter;
    }
}
