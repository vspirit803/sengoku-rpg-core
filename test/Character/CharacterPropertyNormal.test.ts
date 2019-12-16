import { CharacterPropertyConfiguration } from '../../src/Character/CharacterPropertyConfiguration';
import { CharacterPropertyNormal } from '../../src/Character/CharacterPropertyNormal';
import { CharacterNormal } from '../../src/Character/CharacterNormal';

const characterNormal = new CharacterNormal();
const characterPropertyConfiguration = new CharacterPropertyConfiguration({});
test('角色属性(通常) - 初始化校验', () => {
    expect(
        new CharacterPropertyNormal({ character: characterNormal, property: characterPropertyConfiguration }),
    ).toEqual({ character: characterNormal, baseValue: 50, increaseValue: 0 });
});

const characterB = new CharacterNormal({ level: 5 });
const propertyConfigurationB = new CharacterPropertyConfiguration({ baseValue: 5, increaseValue: 3 });
test('角色属性(通常) - normalValue校验', () => {
    expect(
        new CharacterPropertyNormal({ character: characterB, property: propertyConfigurationB }).normalValue,
    ).toEqual(5 + (5 - 1) * 3);
});
