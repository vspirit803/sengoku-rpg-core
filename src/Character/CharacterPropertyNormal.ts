import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyConfiguration } from './CharacterPropertyConfiguration';

/**
 * 角色属性类(平常状态)
 */
export class CharacterPropertyNormal implements CharacterPropertyConfiguration {
  /**基础值 */
  baseValue: number;
  /**成长值 */
  increaseValue: number;
  /**装备值 */
  equipmentValue: number;

  /**角色 */
  character: CharacterNormal;
  constructor({ character, property }: { character: CharacterNormal; property: CharacterPropertyConfiguration }) {
    this.character = character;
    this.baseValue = property.baseValue;
    this.increaseValue = property.increaseValue;
    this.equipmentValue = 0;
  }

  /**
   * 获得常规状态的属性值
   */
  get normalValue(): number {
    if (!this.character) {
      throw new Error('此角色属性实例并未绑定角色');
    }
    return this.character.level * this.increaseValue + this.baseValue + this.equipmentValue;
  }
}
