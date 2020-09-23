import { Rarity } from '@src/Common';

import { ItemBase } from './ItemBase';
import { ItemType } from './ItemType';

/**
 * 系统类物品
 */
export class ItemSystem extends ItemBase {
  constructor({
    id = 'ItemSystem00000',
    name = '未命名系统物品',
    count = 1,
    isStackable = true,
    rarity,
  }: { id?: string; name?: string; count?: number; rarity?: Rarity; isStackable?: boolean } = {}) {
    super({ id, name, isStackable, type: ItemType.System, rarity, count });
  }
}
