import { EquipmentSave } from './EquipmentSave';
import { ItemSave } from './ItemSave';

/**
 * 背包存档接口
 */
export interface BackpackSave {
    materials: Array<ItemSave>;
    equipments: Array<EquipmentSave>;
}
