import { CharacterPropertyConfiguration } from '../../src/Character/CharacterPropertyConfiguration';
import { CharacterConfiguration } from '../../src/Character/CharacterConfiguration';
import { CharacterNormal } from '../../src/Character/CharacterNormal';
import { CharacterBattle } from '../../src/Character/CharacterBattle';
import { TeamBattle } from '../../src/Team/TeamBattle';
import { BattleBattle } from '../../src/Battle/BattleBattle';
import { FactionBattle } from '../../src/Faction/FactionBattle';
import { EventBuff } from '../../src/Status/EventBuff';
import { PropertyBuff } from '../../src/Status/PropertyBuff';
import { Status } from '../../src/Status/Status';
import { TriggerTiming } from '../../src/EventCenter/TriggerTiming';
import { EventDataAttacking } from '../../src/EventCenter/EventData';

const nobuCharacterConfiguration = new CharacterConfiguration({
    id: '0001',
    name: 'Oda Nobunaga',
    properties: {
        attack: new CharacterPropertyConfiguration({ baseValue: 100, increaseValue: 5 }),
        hp: new CharacterPropertyConfiguration({ baseValue: 2000, increaseValue: 50 }),
        speed: new CharacterPropertyConfiguration({ baseValue: 100 }),
    },
});
const nobuCharacterNormal = new CharacterNormal({ character: nobuCharacterConfiguration, level: 10 });
const nobuCharacterBattle = new CharacterBattle({ character: nobuCharacterNormal });
nobuCharacterBattle.properties.attack.extraPercent = 0;
nobuCharacterBattle.properties.attack.extraValue = 0;

const tokuCharacterConfiguration = new CharacterConfiguration({
    id: '0002',
    name: 'Tokugawa Leyasu',
    properties: {
        attack: new CharacterPropertyConfiguration({ baseValue: 80, increaseValue: 4 }),
        hp: new CharacterPropertyConfiguration({ baseValue: 3000, increaseValue: 80 }),
        speed: new CharacterPropertyConfiguration({ baseValue: 90 }),
    },
});
const tokuCharacterNormal = new CharacterNormal({ character: tokuCharacterConfiguration, level: 20 });
const tokuCharacterBattle = new CharacterBattle({ character: tokuCharacterNormal });

const bossCharacterConfiguration = new CharacterConfiguration({
    id: '0000',
    name: 'Boss',
    properties: {
        attack: new CharacterPropertyConfiguration({ baseValue: 2000 }),
        hp: new CharacterPropertyConfiguration({ baseValue: 10000 }),
        speed: new CharacterPropertyConfiguration({ baseValue: 80 }),
    },
});
const bossCharacterNormal = new CharacterNormal({ character: bossCharacterConfiguration, level: 0 });
const bossCharacterBattle = new CharacterBattle({ character: bossCharacterNormal });

console.log('-------织田信长-------');
nobuCharacterBattle.print();
console.log('-------德川家康-------');
tokuCharacterBattle.print();
console.log('-------Boss-------');
bossCharacterBattle.print();

const teamA: TeamBattle = new TeamBattle();
teamA.addMembers(nobuCharacterBattle, tokuCharacterBattle);
const factionA: FactionBattle = new FactionBattle();
factionA.addTeams(teamA);

const teamB: TeamBattle = new TeamBattle();
teamB.addMembers(bossCharacterBattle);
const factionB: FactionBattle = new FactionBattle();
factionB.addTeams(teamB);

const battle = new BattleBattle();
battle.addFactions(factionA, factionB);

const addAtkStatus = new Status({ source: nobuCharacterBattle, target: nobuCharacterBattle });
const addAtkBuff = new EventBuff(addAtkStatus, {
    event: TriggerTiming.Attacking,
    callback: (source, data: EventDataAttacking): boolean => {
        const attackSource = data.source;
        console.log(`${attackSource.name}身上的[${TriggerTiming[TriggerTiming.Attacking]}]事件Buff触发了`);
        attackSource.currHp += 2000;
        const newBuff = new PropertyBuff(addAtkStatus, { name: 'attack', value: 100 });
        addAtkBuff.status.addBuffs(newBuff);
        console.log(
            `${attackSource.name}当前血量:${attackSource.currHp}/${attackSource.properties.hp.battleValue},攻击力:${attackSource.properties.attack.battleValue}`,
        );
        return true;
    },
});
addAtkStatus.addBuffs(addAtkBuff);
nobuCharacterBattle.statuses.push(addAtkStatus);

battle.start();
