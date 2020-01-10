import { CharacterPropertyConfiguration } from './CharacterPropertyConfiguration';
import { EquipmentSlotConfiguration } from './EquipmentSlotConfiguration';

/**
 * 角色配置
 */
export interface CharacterConfiguration {
    id: string;
    name: string;
    properties: { [propName: string]: CharacterPropertyConfiguration };
    equipmentSlots: Array<EquipmentSlotConfiguration>;
}
