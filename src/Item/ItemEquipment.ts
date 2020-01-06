import { ItemBase } from './ItemBase';
import { ItemType } from './ItemType';
import { EquipmentType } from './EquipmentType';
import { CharacterPropertyNormal } from '../Character/CharacterPropertyNormal';
import { CharacterNormal } from '../Character/CharacterNormal';
import { Rarity } from '../Common/Rarity';

/**
 * 装备类物品
 */
export class ItemEquipment extends ItemBase {
    /**穿戴装备的角色 */
    wearer?: CharacterNormal;
    /**装备部位 */
    equipmentType: EquipmentType;
    /**装备属性 */
    properties: { [propName: string]: CharacterPropertyNormal };

    constructor({
        id,
        name,
        equipmentType,
        wearer,
        rarity,
    }: {
        id: string;
        name: string;
        equipmentType: EquipmentType;
        wearer?: CharacterNormal;
        rarity?: Rarity;
    }) {
        super({ id, name, isStackable: false, type: ItemType.Equipment, rarity });
        this.equipmentType = equipmentType;
        this.properties = {};
        this.wearer = wearer;
    }

    /**设置wearer */
    setWearer(wearer: CharacterNormal): void {
        this.wearer = wearer;
    }
}
