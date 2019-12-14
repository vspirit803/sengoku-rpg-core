import { Subscriber } from './Subscriber';
import { TriggerTiming } from './TriggerTiming';
import { UUID } from '../Common/UUID';
// import {
//     EventData,
//     EventDataAttacking,
//     EventDataAttacked,
//     EventDataDamageing,
//     EventDataRoundStart,
//     EventDataBattleStart,
// } from './EventData';
import * as EventData from './EventData';

export class SubscriberFactory {
    static Subscriber(
        event: TriggerTiming.BattleStart,
        callback: (source: UUID, data: EventData.EventDataBattleStart) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.RoundStart,
        callback: (source: UUID, data: EventData.EventDataRoundStart) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.ActionStart,
        callback: (source: UUID, data: EventData.EventDataActionStart) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.Spelling,
        callback: (source: UUID, data: EventData.EventDataSpelling) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.Attacking,
        callback: (source: UUID, data: EventData.EventDataAttacking) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.Attacked,
        callback: (source: UUID, data: EventData.EventDataAttacked) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.Damaging,
        callback: (source: UUID, data: EventData.EventDataDamageing) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.Damaged,
        callback: (source: UUID, data: EventData.EventDataDamaged) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.Killing,
        callback: (source: UUID, data: EventData.EventDataKilling) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.Killed,
        callback: (source: UUID, data: EventData.EventDataKilled) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.ActionEnd,
        callback: (source: UUID, data: EventData.EventDataActionEnd) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming.RoundEnd,
        callback: (source: UUID, data: EventData.EventDataRoundEnd) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority?: number,
    ): Subscriber;

    static Subscriber(
        event: TriggerTiming,
        callback: (source: UUID, data: any) => Promise<boolean> | boolean,
        filter?: UUID | Array<UUID>,
        priority = 5,
    ): Subscriber {
        let subscriberFilter: undefined | symbol | Array<symbol>;
        if (filter === undefined) {
            subscriberFilter = undefined;
        } else if ('uuid' in filter) {
            subscriberFilter = filter.uuid;
        } else {
            subscriberFilter = filter.map((each) => each.uuid);
        }
        return new Subscriber({ event, filter: subscriberFilter, callback, priority });
    }
}
