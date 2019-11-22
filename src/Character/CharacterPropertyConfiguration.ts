/**
 * 角色属性类(配置)
 */
export class CharacterPropertyConfiguration {
    baseValue: number;
    increaseValue: number;
    constructor({ baseValue = 50, increaseValue = 0 }: { baseValue?: number; increaseValue?: number } = {}) {
        this.baseValue = baseValue;
        this.increaseValue = increaseValue;
    }
}
