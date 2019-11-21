import { CharacterPropertyConfiguration } from '../../src/Character/CharacterPropertyConfiguration';
import { CharacterConfiguration } from '../../src/Character/CharacterConfiguration';
import { CharacterNormal } from '../../src/Character/CharacterNormal';
import { CharacterBattle } from '../../src/Character/CharacterBattle';
const attackCharacterPropertyConfiguration = new CharacterPropertyConfiguration({ baseValue: 100, increaseValue: 5 });
const hpCharacterPropertyConfiguration = new CharacterPropertyConfiguration({ baseValue: 2000, increaseValue: 50 });
const speedCharacterPropertyConfiguration = new CharacterPropertyConfiguration({ baseValue: 100, increaseValue: 0 });

const nobuCharacterConfiguration = new CharacterConfiguration();
nobuCharacterConfiguration.id = '0001';
nobuCharacterConfiguration.name = '织田信长';
nobuCharacterConfiguration.properties.attack = attackCharacterPropertyConfiguration;
nobuCharacterConfiguration.properties.hp = hpCharacterPropertyConfiguration;
nobuCharacterConfiguration.properties.speed = speedCharacterPropertyConfiguration;
const nobuCharacterNormal = new CharacterNormal({ character: nobuCharacterConfiguration, level: 10 });
const nobuCharacterBattle = new CharacterBattle({ character: nobuCharacterNormal });

const tokuAttack = new CharacterPropertyConfiguration({ baseValue: 80, increaseValue: 4 });
const tokuHp = new CharacterPropertyConfiguration({ baseValue: 3000, increaseValue: 80 });
const tokuSpeed = new CharacterPropertyConfiguration({ baseValue: 90, increaseValue: 0 });
const tokuCharacterConfiguration = new CharacterConfiguration({
    id: '0002',
    name: '德川家康',
    properties: {
        attack: tokuAttack,
        hp: tokuHp,
        speed: tokuSpeed,
        critRate: new CharacterPropertyConfiguration({ baseValue: 5, increaseValue: 0 }),
        def: { baseValue: 0, increaseValue: 2 },
    },
});
const tokuCharacterNormal = new CharacterNormal({ character: tokuCharacterConfiguration, level: 20 });
const tokuCharacterBattle = new CharacterBattle({ character: tokuCharacterNormal });

console.log('nobuCharacterConfiguration');
console.log(nobuCharacterConfiguration);
console.log('nobuCharacterNormal');
console.log(nobuCharacterNormal);
console.log('nobuCharacterBattle');
console.log(nobuCharacterBattle);

console.log('-------织田信长-------');
for (const key in nobuCharacterBattle.properties) {
    console.log(
        `${key}:  ${nobuCharacterBattle.properties[key].normalValue} ${nobuCharacterBattle.properties[key].battleValue}`,
    );
}

console.log('-------德川家康-------');
for (const key in tokuCharacterBattle.properties) {
    console.log(
        `${key}:  ${tokuCharacterBattle.properties[key].normalValue} ${tokuCharacterBattle.properties[key].battleValue}`,
    );
}
