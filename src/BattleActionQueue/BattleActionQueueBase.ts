import { BattleBattle } from '@src/Battle/BattleBattle';
import { CharacterBattle } from '@src/Character/CharacterBattle';

/**
 * 战斗行动序列(基类)
 */
export interface BattleActionQueueBase {
    battle: BattleBattle;
    roundCount: number;

    getNext(): CharacterBattle;
}
