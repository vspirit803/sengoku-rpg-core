import { UUID } from '@src/Common';
import { Subscriber, SubscriberFactory, TriggerTiming } from '@src/EventCenter';

import { Buff } from './Buff';
import { Status } from './Status';

/**
 * Buff - 事件Buff
 */
export class EventBuff extends Buff {
  /**冷却时间 */
  cooldown: number | 'forever';
  /**当前冷却时间 */
  currCooldown: number | 'forever';
  /**事件订阅者 */
  subscriber: Subscriber;
  /**触发事件 */
  event: TriggerTiming;
  /**触发事件的回调函数 */
  callback: (source: UUID, data: any) => boolean | Promise<boolean>; // eslint-disable-line @typescript-eslint/no-explicit-any
  constructor(
    status: Status,
    {
      cooldown = 0,
      currCooldown = 0,
      event,
      callback,
    }: // subscriber,
    {
      cooldown?: number | 'forever';
      currCooldown?: number | 'forever';
      // subscriber?: Subscriber;
      event: TriggerTiming;
      callback: (source: UUID, data: any) => boolean | Promise<boolean>; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
  ) {
    super(status);
    this.cooldown = cooldown;
    this.currCooldown = currCooldown;
    this.event = event;
    this.callback = callback;
    // this.subscriber = new Subscriber({
    //     event,
    //     filter: this.status.source.uuid,
    //     callback,
    // });
    this.subscriber = SubscriberFactory.Subscriber({ event: event as any, callback, filter: this.status.source }); // eslint-disable-line @typescript-eslint/no-explicit-any
    this.status.source.battle!.eventCenter.addSubscriber(this.subscriber);
  }

  destroy(): void {
    this.status.source.battle!.eventCenter.removeSubscriber(this.subscriber);
  }
}
