import { UUID } from '@src/Common';

import * as EventData from './EventData';
import { Subscriber } from './Subscriber';
import { TriggerTiming } from './TriggerTiming';

export class SubscriberFactory {
  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.BattleStart;
    callback: (source: UUID, data: EventData.EventDataBattleStart) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.RoundStart;
    callback: (source: UUID, data: EventData.EventDataRoundStart) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.ActionStart;
    callback: (source: UUID, data: EventData.EventDataActionStart) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.Spelling;
    callback: (source: UUID, data: EventData.EventDataSpelling) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.SkillSelect;
    callback: (source: UUID, data: EventData.EventDataSkillSelect) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.Attacking;
    callback: (source: UUID, data: EventData.EventDataAttacking) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.Attacked;
    callback: (source: UUID, data: EventData.EventDataAttacked) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.Damaging;
    callback: (source: UUID, data: EventData.EventDataDamaging) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.Damaged;
    callback: (source: UUID, data: EventData.EventDataDamaged) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.Killing;
    callback: (source: UUID, data: EventData.EventDataKilling) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.Killed;
    callback: (source: UUID, data: EventData.EventDataKilled) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.ActionEnd;
    callback: (source: UUID, data: EventData.EventDataActionEnd) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.RoundEnd;
    callback: (source: UUID, data: EventData.EventDataRoundEnd) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  static Subscriber({
    event,
    callback,
    filter,
    priority,
  }: {
    event: TriggerTiming.BattleSuccess;
    callback: (source: UUID, data: EventData.EventDataBattleSuccess) => Promise<boolean> | boolean;
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber;

  /**
   * 生成订阅者
   * @param event 触发时机
   * @param callback 回调函数
   * @param filter 过滤器,undefined表示任意事件
   * @param priority 优先级
   */
  static Subscriber({
    event,
    callback,
    filter,
    priority = 5,
  }: {
    event: TriggerTiming;
    callback: (source: UUID, data: any) => Promise<boolean> | boolean; // eslint-disable-line @typescript-eslint/no-explicit-any
    filter?: UUID | Array<UUID>;
    priority?: number;
  }): Subscriber {
    let subscriberFilter: undefined | symbol | Array<symbol>;
    if (filter === undefined) {
      subscriberFilter = undefined;
    } else if (!Array.isArray(filter)) {
      subscriberFilter = filter.uuid;
    } else {
      subscriberFilter = filter.map((each) => each.uuid);
    }
    return new Subscriber({ event, filter: subscriberFilter, callback, priority });
  }
}
