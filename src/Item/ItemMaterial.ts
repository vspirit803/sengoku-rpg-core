import { ItemBase, ItemType } from './index';

/**
 * 材料类物品
 */
export abstract class ItemMaterial extends ItemBase {
    constructor({ id = 'Material00000', name = '未命名材料' }: { id?: string; name?: string } = {}) {
        super({ id, name, isStackable: true, type: ItemType.Material });
    }
}
