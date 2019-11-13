import { ItemConfiguration } from './ItemConfiguration';

/**
 * 物品(基础)
 */
export class ItemBase extends ItemConfiguration {
    type: string;
    constructor() {
        super();
        this.type = 'system';
    }
}
