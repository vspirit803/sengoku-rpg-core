import { ItemBase } from './ItemBase';
import { ItemType } from './ItemType';
import { EquipmentType } from './EquipmentType';
import { CharacterNormal } from '@/Character';
import { Rarity } from '@/Common/Rarity';
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
    /**装备评分 */
    get score(): number {
        return Object.values(this.properties)
            .map((eachProperty) => eachProperty.value / eachProperty.max)
            .reduce((prev, curr) => prev * curr);
    }

    // constructor(equipmentConfiguration: EquipmentConfiguration);
    // constructor(equipmentSave: EquipmentSave);
    // constructor(equipment: EquipmentConfiguration | EquipmentSave) {
    //     super();
    //     if ('type' in equipment) {
    //         //参数为EquipmentConfiguration
    //         this.uuid = Symbol('ItemEquipment');

    //         this.id = equipment.id;
    //         this.level = equipment.level;
    //         this.equipmentType = equipment.equipmentType;
    //         this.properties = {};
    //         for (const eachEquipmentPropertyConfiguration in equipment.properties) {
    //             const { min, max } = equipment.properties[eachEquipmentPropertyConfiguration];
    //             const value = Math.round(Math.random() * (max - min) + min);
    //             this.properties[eachEquipmentPropertyConfiguration] = { min, max, value };
    //         }
    //     }
    //     else{
    //         //参数为EquipmentSave
    //     }
    // }

    constructor({
        id,
        name,
        equipmentType,
        wearer,
        rarity,
        level,
        properties,
    }: {
        id: string;
        name: string;
        equipmentType: EquipmentType;
        wearer?: CharacterNormal;
        rarity: Rarity;
        level: number;
        properties: { [propName: string]: EquipmentProperty };
    }) {
        super({ id, name, isStackable: false, rarity });
        this.uuid = Symbol('ItemEquipment');
        this.type = ItemType.Equipment;
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
