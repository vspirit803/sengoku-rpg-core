import { CharacterPropertyNormal } from './CharacterPropertyNormal';
import { CharacterBattle } from './CharacterBattle';
/**
 * 角色属性类(战斗状态)
 */
export class CharacterPropertyBattle extends CharacterPropertyNormal {
    character?: CharacterBattle;

    // 获取战斗时属性
    get battleValue(): number {
        if (!this.character) {
            throw new Error('此角色属性实例并未绑定角色');
        }
        return this.normalValue + Math.round(Math.random() * 5);
    }
}
