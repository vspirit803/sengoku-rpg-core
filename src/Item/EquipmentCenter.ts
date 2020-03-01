import { ItemEquipment } from './ItemEquipment';
import { EquipmentType } from './EquipmentType';
import { EquipmentProperty } from './EquipmentProperty';
import { Rarity } from '@src/Common/Rarity';
import { EquipmentSave } from './EquipmentSave';
import { EquipmentConfiguration } from './EquipmentConfiguration';
import { SaveInterface } from '@src/Game';

/**
 * 装备中心
 */
export class EquipmentCenter implements SaveInterface<Array<EquipmentSave>> {
    equipmentsConfiguration: Array<EquipmentConfiguration>;
    equipmentsConfigurationMap: Map<string, EquipmentConfiguration>;
    equipments: Array<ItemEquipment>;

    constructor() {
        this.equipmentsConfiguration = [];
        this.equipmentsConfigurationMap = new Map<string, EquipmentConfiguration>();
        this.equipments = [];
    }

    /**
     * 加入装备
     * @param equipment 要加入的装备
     */
    addEquipment(equipment: ItemEquipment): void {
        this.equipments.push(equipment);
    }

    /**
     * 载入装备配置
     * @param equipments 角色配置数组
     */
    loadConfiguration(equipments: Array<EquipmentConfiguration>): void {
        for (const eachEquipment of equipments) {
            this.equipmentsConfiguration.push(eachEquipment);
            this.equipmentsConfigurationMap.set(eachEquipment.id, eachEquipment);
        }
    }

    loadSave(saveData: Array<EquipmentSave>): void {
        for (const eachEquipmentSave of saveData) {
            const itemEquipment = this.generateEquipment(eachEquipmentSave);
            this.addEquipment(itemEquipment);
        }
    }

    generateSave(): Array<EquipmentSave> {
        return this.equipments.map((eachEquipment) => {
            const properties: { [propName: string]: number } = {};
            for (const eachEquipmentProperty in eachEquipment.properties) {
                properties[eachEquipmentProperty] = eachEquipment.properties[eachEquipmentProperty].value;
            }
            return {
                id: eachEquipment.id,
                properties,
                count: 1,
                wearerId: eachEquipment.wearer?.id,
            };
        });
    }

    generateEquipment(equipmentConfiguration: EquipmentConfiguration): ItemEquipment;
    generateEquipment(equipmentSave: EquipmentSave): ItemEquipment;
    generateEquipment(equipment: EquipmentConfiguration | EquipmentSave): ItemEquipment {
        let equipmentConfiguration: EquipmentConfiguration;
        if ('type' in equipment) {
            //参数为EquipmentConfiguration
            equipmentConfiguration = equipment;
        } else {
            //参数为EquipmentSave
            const id = equipment.id;
            const tempEquipmentConfiguration = this.equipmentsConfigurationMap.get(id);
            if (tempEquipmentConfiguration === undefined) {
                throw new Error(`装备[${id}]的配置不存在`);
            }
            equipmentConfiguration = tempEquipmentConfiguration;
        }
        const rarity = (Rarity as { [enumStr: string]: number | string })[equipmentConfiguration.rarity] as Rarity;
        const equipmentType = (EquipmentType as { [enumStr: string]: number | string })[
            equipmentConfiguration.equipmentType
        ] as EquipmentType;
        const properties: { [propName: string]: EquipmentProperty } = {};
        for (const eachEquipmentPropertyConfiguration in equipment.properties) {
            const { min, max } = equipmentConfiguration.properties[eachEquipmentPropertyConfiguration];
            let value: number;
            if ('type' in equipment) {
                //范围内随机取值
                value = Math.random() * (max - min) + min;
                //若为整数则取整
                if (Number.isInteger(min) && Number.isInteger(max)) {
                    value = Math.round(value);
                }
            } else {
                //从存档读取数值
                value = equipment.properties[eachEquipmentPropertyConfiguration];
            }
            properties[eachEquipmentPropertyConfiguration] = { min, max, value };
        }
        return new ItemEquipment({ ...equipmentConfiguration, rarity, equipmentType, properties });
    }
}
