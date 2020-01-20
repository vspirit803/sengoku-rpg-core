import { CharacterPropertyNormal } from '../../src/Character/CharacterPropertyNormal';
import { CharacterNormal } from '../../src/Character/CharacterNormal';

test('角色属性(常规) - normalValue校验', () => {
    const characterNormal = new CharacterNormal({
        id: 'C0001',
        name: '织田信长',
        properties: { atk: { baseValue: 10, increaseValue: 5 } },
        equipmentSlots: [],
    });
    characterNormal.setLevel(5);
    const property = new CharacterPropertyNormal({
        character: characterNormal,
        property: { baseValue: 10, increaseValue: 5 },
    });
    expect(property).toEqual({ character: characterNormal, equipmentValue: 0, baseValue: 10, increaseValue: 5 });
    expect(property.normalValue).toEqual(10 + 5 * 5);
});
