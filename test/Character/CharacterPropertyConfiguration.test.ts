import { CharacterPropertyConfiguration } from '../../src/Character/CharacterPropertyConfiguration';

test('角色属性(配置) - 默认值', () => {
    expect(new CharacterPropertyConfiguration({})).toEqual({ baseValue: 50, increaseValue: 0 });
});
test('角色属性(配置) - 传值', () => {
    expect(
        new CharacterPropertyConfiguration({
            baseValue: 10,
            increaseValue: 20,
        }),
    ).toEqual({ baseValue: 10, increaseValue: 20 });
});
