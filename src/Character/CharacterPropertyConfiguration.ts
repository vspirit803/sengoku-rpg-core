/**
 * 角色属性类(配置)
 */
export class CharacterPropertyConfiguration {
    baseValue: number;
    increaseValue: number;
    constructor(
        { baseValue = 5, increaseValue = 1 }: { baseValue?: number; increaseValue?: number } = {
            baseValue: 5,
            increaseValue: 1,
        },
    ) {
        this.baseValue = baseValue;
        this.increaseValue = increaseValue;
    }
}
