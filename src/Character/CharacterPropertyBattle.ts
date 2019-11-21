import { CharacterPropertyNormal } from './CharacterPropertyNormal';
import { CharacterBattle } from './CharacterBattle';
/**
 * 角色属性类(战斗状态)
 */
export class CharacterPropertyBattle extends CharacterPropertyNormal {
    character: CharacterBattle;
    constructor({ character, property }: { character: CharacterBattle; property: CharacterPropertyNormal }) {
        super({ character, property });
        this.character = character;
        this.baseValue = property.baseValue;
        this.increaseValue = property.increaseValue;
    }

    /**
     * 获得战斗状态的属性值
     */
    get battleValue(): number {
        if (!this.character) {
            throw new Error('此角色属性实例并未绑定角色');
        }
        return this.normalValue + Math.round(Math.random() * 5);
    }
}
