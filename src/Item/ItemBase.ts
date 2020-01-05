import { ItemType, ItemConfiguration } from './index';

/**
 * 物品基类
 */
export abstract class ItemBase extends ItemConfiguration {
    type: ItemType;
    constructor({
        id = 'Item00000',
        name = '未命名物品',
        isStackable = false,
        type = ItemType.System,
    }: { id?: string; name?: string; isStackable?: boolean; type?: ItemType } = {}) {
        super({ id, name, isStackable });
        this.type = type;
        this.id = id;
        this.name = name;
        this.isStackable = isStackable;
    }
}
