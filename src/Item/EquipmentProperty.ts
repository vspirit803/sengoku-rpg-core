import { EquipmentPropertyConfiguration } from './EquipmentPropertyConfiguration';

/**
 * 装备属性类
 */
export interface EquipmentProperty extends EquipmentPropertyConfiguration {
    /**最小值 */
    min: number;

    /**最大值 */
    max: number;

    /**实际值 */
    value: number;
}
