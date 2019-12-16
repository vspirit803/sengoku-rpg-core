import { UUID } from '../Common/UUID';
import { TriggerTiming } from './TriggerTiming';
import { EventData } from './EventData';

// type EventData = { [propName: string]: any };

/**
 * 事件
 */
export class Event {
    type: TriggerTiming;
    source: UUID;
    data: EventData;
    constructor({ type, source, data }: { type: TriggerTiming; source: UUID; data?: EventData }) {
        this.type = type;
        this.source = source;
        this.data = data || {};
    }
}
