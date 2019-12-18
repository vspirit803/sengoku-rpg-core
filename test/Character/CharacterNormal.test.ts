import { CharacterNormal } from '../../src/Character/CharacterNormal';
import { CharacterPropertyConfiguration } from '../../src/Character/CharacterPropertyConfiguration';
import { CharacterConfiguration } from '../../src/Character/CharacterConfiguration';

test('角色(常规) - 默认值初始化', () => {
    const character = new CharacterNormal({});
    expect(character).toEqual({ id: '', name: '未命名角色', level: 1, properties: {}, uuid: character.uuid });
});
test('角色(常规) - 传值初始化', () => {
    const attack = new CharacterPropertyConfiguration({
        baseValue: 50,
        increaseValue: 5,
    });
    const characterConfiguration = new CharacterConfiguration({ id: '0001', name: '织田信长', properties: { attack } });
    const character = new CharacterNormal({ character: characterConfiguration, level: 5 });
    expect(character.properties.attack.character).toBe(character);
});
