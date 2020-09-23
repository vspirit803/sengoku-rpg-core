import { FactionConfiguration } from '@src/Faction';

/**
 * 战斗(配置)
 */

export interface BattleConfiguration {
  id: string;
  /**战斗名称 */
  name: string;
  factions: Array<FactionConfiguration>;
}
