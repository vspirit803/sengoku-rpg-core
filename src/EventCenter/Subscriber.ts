import { UUID } from '../Common/UUID';

type EventData = Map<string, any>;
/**
 * 订阅者
 */
export class Subscriber {
    event: string;
    filter?: symbol | Array<symbol>;
    priority: number;
    /**
     * 返回true表示继续后续事件处理;返回false表示阻止后续事件处理
     */
    callback: (source: UUID, data: EventData) => Promise<boolean> | boolean;
    timestamp: number;
    constructor({
        event,
        filter,
        priority = 5,
        callback,
    }: {
        event: string;
        filter?: symbol | Array<symbol>;
        priority?: number;
        /**
         * 返回true表示继续后续事件处理;返回false表示阻止后续事件处理
         */
        callback: (source: UUID, data: EventData) => Promise<boolean> | boolean;
    }) {
        this.event = event;
        this.filter = filter;
        this.priority = priority;
        this.callback = callback;
        this.timestamp = Date.now();
    }
}
