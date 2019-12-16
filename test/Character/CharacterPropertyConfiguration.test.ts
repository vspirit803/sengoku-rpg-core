import { CharacterPropertyConfiguration } from '../../src/Character/CharacterPropertyConfiguration';
const property = new CharacterPropertyConfiguration({
    baseValue: 10,
    increaseValue: 0,
});
test('角色属性配置', () => {
    expect(property).toEqual({ baseValue: 10, increaseValue: 0 });
});
