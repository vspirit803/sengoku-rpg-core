import { BattleBattle } from '@src/Battle';
import { CharacterBattle } from '@src/Character';

/**
 * 战斗行动序列(基类)
 */
export interface BattleActionQueueBase {
  battle: BattleBattle;
  roundCount: number;

  getNext(): CharacterBattle;
}
