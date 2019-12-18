import { CharacterPropertyConfiguration } from '../../src/Character/CharacterPropertyConfiguration';
import { CharacterPropertyNormal } from '../../src/Character/CharacterPropertyNormal';
import { CharacterNormal } from '../../src/Character/CharacterNormal';

test('角色属性(常规) - 初始化校验', () => {
    const characterNormal = new CharacterNormal();
    const characterPropertyConfiguration = new CharacterPropertyConfiguration({});
    expect(
        new CharacterPropertyNormal({ character: characterNormal, property: characterPropertyConfiguration }),
    ).toEqual({ character: characterNormal, baseValue: 50, increaseValue: 0 });
});

test('角色属性(常规) - normalValue校验', () => {
    const characterB = new CharacterNormal({ level: 5 });
    const propertyConfigurationB = new CharacterPropertyConfiguration({ baseValue: 5, increaseValue: 3 });
    expect(
        new CharacterPropertyNormal({ character: characterB, property: propertyConfigurationB }).normalValue,
    ).toEqual(5 + (5 - 1) * 3);
});
