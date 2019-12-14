import { Buff } from './Buff';
import { Status } from './Status';
import { Subscriber } from '../EventCenter/Subscriber';
import { TriggerTiming } from '../EventCenter/TriggerTiming';
import { UUID } from '../Common/UUID';
import { EventData, EventDataAttacking } from '../EventCenter/EventData';
import { SubscriberFactory } from '../EventCenter/SubscriberFactory';
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
    callback: (source: UUID, data: any) => boolean | Promise<boolean>;
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
            callback: (source: UUID, data: any) => boolean | Promise<boolean>;
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
        this.subscriber = SubscriberFactory.Subscriber(event as any, callback as any, this.status.source);
        this.status.source.battle!.eventCenter.addSubscriber(this.subscriber);
    }

    destroy(): void {
        this.status.source.battle!.eventCenter.removeSubscriber(this.subscriber);
    }
}
