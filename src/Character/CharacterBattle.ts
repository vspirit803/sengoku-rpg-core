import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyBattle } from './CharacterPropertyBattle';
import { TeamBattle } from '../Team/TeamBattle';
import { FactionBattle } from '../Faction/FactionBattle';
import { BattleBattle } from '../Battle/BattleBattle';

/**
 * 角色类(战斗状态)
 */
export class CharacterBattle extends CharacterNormal {
    /**角色所处的队伍 */
    team?: TeamBattle;
    /**角色所处的阵营 */
    faction?: FactionBattle;
    /**角色所处的战斗 */
    battle?: BattleBattle;
    properties: { [propName: string]: CharacterPropertyBattle };
    isAlive: boolean; //是否存活
    isSilence: boolean; //是否被沉默
    isStunned: boolean; //是否被眩晕

    constructor() {
        super();
        this.properties = {};
        this.isAlive = true;
        this.isSilence = false;
        this.isStunned = false;
    }
}
