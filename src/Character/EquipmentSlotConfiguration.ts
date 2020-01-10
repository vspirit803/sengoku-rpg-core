/**
 * 装备插槽/装备栏配置
 */
export interface EquipmentSlotConfiguration {
    /**插槽名称 */
    name: string;

    /**允许的装备类型 */
    validEquipmentTypes: Array<string>;
}
// export class EquipmentSlotConfiguration {
//     /**插槽名称 */
//     name: string;

//     /**允许的装备类型 */
//     validEquipmentTypes: Set<EquipmentType>;

//     constructor({ name, validEquipmentTypes }: { name: string; validEquipmentTypes: Array<string> }) {
//         this.name = name;
//         this.validEquipmentTypes = new Set<EquipmentType>();
//         for (const eachValidEquipmentTypeStr of validEquipmentTypes) {
//             const eachValidEquipmentType = (EquipmentType as { [enumStr: string]: number | string })[
//                 eachValidEquipmentTypeStr
//             ] as EquipmentType;
//             this.validEquipmentTypes.add(eachValidEquipmentType);
//         }
//     }
// }
