import { Subscriber } from './Subscriber';
import { Event } from './Event';

/**
 * 发布-订阅模式的事件中心
 */

export class EventCenter {
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
     * 移除订阅者
     * @param subscriber 要移除的订阅者
     */
    removeSubscriber(subscriber: Subscriber): void {
        this.subscribers = this.subscribers.filter((eachSubscriber) => {
            return eachSubscriber !== subscriber;
        });
    }

    /**
     * 发布事件
     * @param event 触发的事件
     * @param isAsync 是否异步执行(默认同步)
     */
    async trigger(event: Event, isAsync = false): Promise<void> {
        const filteredSubscribers = this.subscribers
            .filter((eachSubscriber) => {
                return (
                    eachSubscriber.event === event.type &&
                    (eachSubscriber.filter === undefined || //该订阅者不过滤来源
                    (typeof eachSubscriber.filter === 'symbol' && eachSubscriber.filter === event.source.uuid) || //仅单个来源触发
                        (typeof eachSubscriber.filter === 'object' &&
                            eachSubscriber.filter.includes(event.source.uuid))) //多个来源可触发
                );
            })
            .sort((a, b) => {
                //比较优先级 相同则比较时间戳
                return a.priority !== b.priority ? b.priority - a.priority : a.timestamp - b.timestamp;
            });
        for (let i = 0; i < filteredSubscribers.length; i++) {
            const eachSubscriber = filteredSubscribers[i];
            let goOnFlag = true; //可能有的回调事件会阻止后面的事件触发
            if (isAsync) {
                goOnFlag = eachSubscriber.callback(event.source, event.data) as boolean;
            } else {
                goOnFlag = await (eachSubscriber.callback(event.source, event.data) as Promise<boolean>);
            }
            if (!goOnFlag) {
                break;
            }
        }
    }
}

const eventCenter = new EventCenter();
export { eventCenter };
