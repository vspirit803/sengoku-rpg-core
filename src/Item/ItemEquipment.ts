import { ItemBase, ItemType } from './ItemIndex';

/**
 * 装备类物品
 */
export abstract class ItemEquipment extends ItemBase {
    constructor({ id = 'Equipment00000', name = '未命名装备' }: { id?: string; name?: string } = {}) {
        super({ id, name, isStackable: false, type: ItemType.Equipment });
    }
}
