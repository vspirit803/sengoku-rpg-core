import { ItemBase, ItemType } from './index';
import { EquipmentType } from './EquipmentType';
import { CharacterPropertyNormal } from '../Character/CharacterPropertyNormal';
import { CharacterNormal } from '../Character/CharacterNormal';

/**
 * 装备类物品
 */
export abstract class ItemEquipment extends ItemBase {
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
    }: {
        id: string;
        name: string;
        equipmentType: EquipmentType;
        wearer?: CharacterNormal;
    }) {
        super({ id, name, isStackable: false, type: ItemType.Equipment });
        this.equipmentType = equipmentType;
        this.properties = {};
        this.wearer = wearer;
    }

    /**设置wearer */
    setWearer(wearer: CharacterNormal): void {
        this.wearer = wearer;
    }
}
