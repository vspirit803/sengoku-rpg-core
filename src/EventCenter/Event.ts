import { UUID } from '@src/Common';

import { EventData } from './EventData';
import { TriggerTiming } from './TriggerTiming';

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
    this.data = data ?? {};
  }
}
