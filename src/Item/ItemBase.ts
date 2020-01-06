import { ItemConfiguration } from './ItemConfiguration';
import { ItemType } from './ItemType';
import { Rarity } from '../Common/Rarity';

/**
 * 物品基类
 */
export abstract class ItemBase extends ItemConfiguration {
    type: ItemType;
    rarity: Rarity;
    count: number;

    /* istanbul ignore next */
    constructor({
        id = 'Item00000',
        name = '未命名物品',
        isStackable = false,
        type = ItemType.System,
        rarity = Rarity.Common,
        count = 1,
    }: { id?: string; name?: string; isStackable?: boolean; type?: ItemType; rarity?: Rarity; count?: number } = {}) {
        super({ id, name, isStackable });
        this.type = type;
        this.id = id;
        this.name = name;
        this.isStackable = isStackable;
        this.rarity = rarity;
        this.count = count;
    }
}
