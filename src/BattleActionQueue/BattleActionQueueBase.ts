import { BattleBattle } from '../Battle/BattleBattle';
import { CharacterBattle } from '../Character/CharacterBattle';

/**
 * 战斗行动序列(基类)
 */
export interface BattleActionQueueBase {
    battle: BattleBattle;
    roundCount: number;

    getNext(): CharacterBattle;
}
