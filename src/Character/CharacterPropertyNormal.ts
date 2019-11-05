import { CharacterPropertyConfiguration } from './CharacterPropertyConfiguration';
import { CharacterNormal } from './CharacterNormal';
/**
 * 角色属性类(平常状态)
 */
export class CharacterPropertyNormal extends CharacterPropertyConfiguration {
    character?: CharacterNormal;
    get normalValue(): number {
        if (!this.character) {
            throw new Error('此角色属性实例并未绑定角色');
        }
        return this.character.level * this.increaseValue + this.baseValue;
    }
}
