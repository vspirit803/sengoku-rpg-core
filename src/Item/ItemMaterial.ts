import { Rarity } from '@src/Common';

import { ItemBase } from './ItemBase';
import { ItemType } from './ItemType';

/**
 * 材料类物品
 */
export class ItemMaterial extends ItemBase {
    constructor({
        id = 'Material00000',
        name = '未命名材料',
        count = 1,
        rarity,
    }: { id?: string; name?: string; count?: number; rarity?: Rarity } = {}) {
        super({ id, name, isStackable: true, type: ItemType.Material, rarity, count });
    }
}
