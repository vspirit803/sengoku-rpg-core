import { CharacterConfiguration } from '../../src/Character/CharacterConfiguration';
import { CharacterPropertyConfiguration } from '../../src/Character/CharacterPropertyConfiguration';

test('角色(配置) - 默认值', () => {
    expect(new CharacterConfiguration({})).toEqual({ id: '', name: '未命名角色', properties: {} });
});
test('角色(配置) - 带属性', () => {
    const attack = new CharacterPropertyConfiguration({
        baseValue: 50,
        increaseValue: 5,
    });
    expect(new CharacterConfiguration({ id: '0001', name: '织田信长', properties: { attack } })).toEqual({
        id: '0001',
        name: '织田信长',
        properties: { attack },
    });
});
