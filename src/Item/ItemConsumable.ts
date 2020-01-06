import { ItemBase } from './ItemBase';
import { ItemType } from './ItemType';
import { Rarity } from '../Common/Rarity';

/**
 * 消耗类物品
 */
export class ItemConsumable extends ItemBase {
    constructor({
        id = 'Consumable00000',
        name = '未命名消耗品',
        count = 1,
        rarity,
    }: { id?: string; name?: string; rarity?: Rarity; count?: number } = {}) {
        super({ id, name, isStackable: true, type: ItemType.Consumable, rarity, count });
    }
}
