import { ItemBase } from './ItemBase';
import { ItemType } from './ItemType';
import { EquipmentType } from './EquipmentType';
import { CharacterNormal } from '../Character/CharacterNormal';
import { Rarity } from '../Common/Rarity';
import { EquipmentProperty } from './EquipmentProperty';

/**
 * 装备类物品
 */
export class ItemEquipment extends ItemBase {
    /**穿戴装备的角色 */
    wearer?: CharacterNormal;
    /**装备部位 */
    equipmentType: EquipmentType;
    /**装备属性 */
    properties: { [propName: string]: EquipmentProperty };
    /**装备等级 */
    level: number;

    constructor({
        id,
        name,
        equipmentType,
        wearer,
        rarity,
        level = 0,
        properties = {},
    }: {
        id: string;
        name: string;
        equipmentType: EquipmentType;
        wearer?: CharacterNormal;
        rarity?: Rarity;
        level?: number;
        properties?: { [propName: string]: EquipmentProperty };
    }) {
        super({ id, name, isStackable: false, type: ItemType.Equipment, rarity });
        this.level = level;
        this.equipmentType = equipmentType;
        this.wearer = wearer;
        this.properties = properties;
    }

    /**设置wearer */
    setWearer(wearer: CharacterNormal): void {
        this.wearer = wearer;
    }
}
