import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyBattle } from './CharacterPropertyBattle';

/**
 * 角色类(战斗状态)
 */
export class CharacterBattle extends CharacterNormal {
    properties: { [propName: string]: CharacterPropertyBattle };
    isAlive: boolean; //是否存活
    isSilence: boolean; //是否被沉默
    isStunned: boolean; //是否被眩晕

    constructor() {
        super();
        this.properties = {};
        this.isAlive = false;
        this.isSilence = false;
        this.isStunned = false;
    }
}
