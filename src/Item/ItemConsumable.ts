import { ItemBase, ItemType } from './index';

/**
 * 消耗类物品
 */
export abstract class ItemConsumable extends ItemBase {
    constructor({ id = 'Consumable00000', name = '未命名消耗品' }: { id?: string; name?: string } = {}) {
        super({ id, name, isStackable: true, type: ItemType.Consumable });
    }
}
