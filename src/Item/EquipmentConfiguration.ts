import { ItemConfiguration } from './ItemConfiguration';
import { EquipmentPropertyConfiguration } from './EquipmentPropertyConfiguration';

/**
 * 装备配置接口
 */
export interface EquipmentConfiguration extends ItemConfiguration {
    /**装备类别 */
    equipmentType: string;
    /**装备等级 */
    level: number;
    /**装备属性 */
    properties: { [propName: string]: EquipmentPropertyConfiguration };
}
