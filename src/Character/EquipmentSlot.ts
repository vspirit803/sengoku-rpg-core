import { EquipmentType, ItemEquipment } from '@src/Item';
import { EquipmentSlotConfiguration } from './EquipmentSlotConfiguration';

/**
 * 装备插槽/装备栏
 */
export class EquipmentSlot {
    /**插槽名称 */
    name: string;
    /**允许的装备类型 */
    validEquipmentTypes: Set<EquipmentType>;
    /**插槽中的装备 */
    equipment?: ItemEquipment;

    constructor(equipmentSlot: EquipmentSlotConfiguration) {
        this.name = equipmentSlot.name;
        this.validEquipmentTypes = new Set<EquipmentType>();
        for (const eachValidEquipmentTypeStr of equipmentSlot.validEquipmentTypes) {
            const eachValidEquipmentType = (EquipmentType as { [enumStr: string]: number | string })[
                eachValidEquipmentTypeStr
            ] as EquipmentType;
            this.validEquipmentTypes.add(eachValidEquipmentType);
        }
    }

    /**
     * 设置插槽中的装备
     * @param equipment 要放入插槽中的装备
     */
    setEquipment(equipment: ItemEquipment): void {
        this.equipment = equipment;
    }
}
// export class EquipmentSlot extends EquipmentSlotConfiguration {
//     /**插槽中的装备 */
//     equipment?: ItemEquipment;

//     constructor({
//         equipmentSlotConfiguration,
//         equipment,
//     }: {
//         equipmentSlotConfiguration: EquipmentSlotConfiguration;
//         equipment?: ItemEquipment;
//     }) {
//         super({
//             name: equipmentSlotConfiguration.name,
//             validEquipmentTypes: Array.from(equipmentSlotConfiguration.validEquipmentTypes).map(
//                 (eachValidEquipmentType) => EquipmentType[eachValidEquipmentType],
//             ),
//         });
//         this.equipment = equipment;
//     }
// }
