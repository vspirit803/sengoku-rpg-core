import { UUID } from '../Common/UUID';
import { EventData, EventDataAttacking } from './EventData';

export interface Callback {
    callback: (source: UUID, data: any) => Promise<boolean> | boolean;
}
export interface CallbackAttacking extends Callback {
    callback: (source: UUID, data: EventDataAttacking) => Promise<boolean> | boolean;
}
