import { CharacterNormal } from '@src/Character/CharacterNormal';
import { CharacterPropertyConfiguration } from '@src/Character/CharacterPropertyConfiguration';
import { CharacterConfiguration } from '@src/Character/CharacterConfiguration';

test('角色(常规) - 传值初始化', () => {
    const attack: CharacterPropertyConfiguration = {
        baseValue: 50,
        increaseValue: 5,
    };
    const characterConfiguration: CharacterConfiguration = {
        id: '0001',
        name: '织田信长',
        properties: { attack },
        equipmentSlots: [],
    };
    const character = new CharacterNormal(characterConfiguration);
    character.level = 5;
    expect(character.properties.attack.character).toBe(character);
});
