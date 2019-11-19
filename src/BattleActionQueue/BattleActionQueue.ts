import { BattleBattle } from '../Battle/BattleBattle';
import { CharacterBattle } from '../Character/CharacterBattle';
import { BattleActionQueueBase } from './BattleActionQueueBase';

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
        if (this.actionQueue.length === 0) {
            //该回合已行动完毕,应该开始下一个回合
            this.actionQueue.push(...this.battle!.characters);
        }
        return this.actionQueue.shift()!;
    }
}
