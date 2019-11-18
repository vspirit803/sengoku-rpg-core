/**
 * 事件
 */

export class Event {
    type: string;
    source: any;
    constructor({ type, source }: { type: string; source: any }) {
        this.type = type;
        this.source = source;
    }
}
