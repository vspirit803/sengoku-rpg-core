import { CharacterBattle } from '@src/Character';
import { BattleBattle } from '@src/Battle';

export interface EventData {} // eslint-disable-line
export interface EventDataBattleStart extends EventData {
    battle: BattleBattle;
}

export interface EventDataRoundStart extends EventData {
    battle: BattleBattle;
    round: number;
}

export interface EventDataActionStart extends EventData {
    source: CharacterBattle;
}

export interface EventDataSpelling extends EventData {
    source: CharacterBattle;
    target: CharacterBattle;
}

export interface EventDataAttacking extends EventData {
    source: CharacterBattle;
    target: CharacterBattle;
}

export interface EventDataAttacked extends EventData {
    source: CharacterBattle;
    target: CharacterBattle;
}

export interface EventDataDamageing extends EventData {
    source: CharacterBattle;
    target: CharacterBattle;
    damage: number;
}

export interface EventDataDamaged extends EventData {
    source: CharacterBattle;
    target: CharacterBattle;
    damage: number;
}

export interface EventDataKilling extends EventData {
    source: CharacterBattle;
    target: CharacterBattle;
    damage: number;
}

export interface EventDataKilled extends EventData {
    source: CharacterBattle;
    target: CharacterBattle;
    damage: number;
}

export interface EventDataActionEnd extends EventData {
    source: CharacterBattle;
}

export interface EventDataRoundEnd extends EventData {
    battle: BattleBattle;
    round: number;
}

export interface EventDataBattleSuccess extends EventData {
    battle: BattleBattle;
    round: number;
    killed: Array<string>;
}
