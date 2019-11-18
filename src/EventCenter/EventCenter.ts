import { Subscriber } from './Subscriber';
import { Event } from './Event';

/**
 * 发布-订阅模式的事件中心
 */

class EventCenter {
    subscribers: Array<Subscriber>;
    constructor() {
        this.subscribers = new Array<Subscriber>(0);
    }

    /**
     * 增加订阅者
     * @param subscriber 要增加的订阅者
     */
    addSubscriber(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }

    /**
     * 发布事件
     */
    publish(event: Event) {
        /**
         * todo
         */
    }
}

const eventCenter = new EventCenter();
export { eventCenter };
