import { Rarity, UUID } from '@src/Common';
import { ObjectId } from 'bson';

import { ItemType } from './ItemType';

/**
 * 物品基类
 */
export abstract class ItemBase implements UUID {
  /**uuid */
  uuid: string;
  /**配置id */
  id: string;
  /**名称 */
  name: string;
  /**类别 */
  type: ItemType;
  /**能否堆叠 */
  isStackable: boolean;
  /**稀有度 */
  rarity: Rarity;
  /**数量 */
  count: number;

  constructor({
    id = 'Item00000',
    name = '未命名物品',
    isStackable = false,
    type = ItemType.System,
    rarity = Rarity.Common,
    count = 1,
  }: { id?: string; name?: string; isStackable?: boolean; type?: ItemType; rarity?: Rarity; count?: number } = {}) {
    this.uuid = new ObjectId().toHexString();
    this.type = type;
    this.id = id;
    this.name = name;
    this.isStackable = isStackable;
    this.rarity = rarity;
    this.count = count;
  }
}
