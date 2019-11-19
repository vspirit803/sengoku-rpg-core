import { BattleBattle } from '../Battle/BattleBattle';
import { CharacterBattle } from '../Character/CharacterBattle';

/**
 * 战斗行动序列(基类)
 */
export abstract class BattleActionQueueBase {
    battle?: BattleBattle;
    init(): void {
        if (!this.battle) {
            throw Error('战斗行动序列生成器初始化失败!未绑定battle.');
        }
    }

    /**
     * 为行动序列绑定战斗
     * @param battle 要绑定的战斗实例
     */
    setBattle(battle: BattleBattle): void {
        this.battle = battle;
    }

    abstract getNext(): CharacterBattle;
}
