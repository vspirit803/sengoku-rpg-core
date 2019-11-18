/**
 * 订阅者
 */

export class Subscriber {
    event: string;
    filter: any;
    callback: Function;
    constructor({ event, filter = undefined, callback }: { event: string; filter?: any; callback: Function }) {
        this.event = event;
        this.filter = filter;
        this.callback = callback;
    }
}
