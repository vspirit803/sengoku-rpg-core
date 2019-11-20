import { UUID } from '../Common/UUID';

type EventData = { [propName: string]: any };

/**
 * 事件
 */
export class Event {
    type: string;
    source: UUID;
    data: EventData;
    constructor({ type, source, data }: { type: string; source: UUID; data?: EventData }) {
        this.type = type;
        this.source = source;
        this.data = data || {};
    }
}
