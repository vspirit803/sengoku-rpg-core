import { ItemSave } from './ItemSave';
import { EquipmentSave } from './EquipmentSave';

/**
 * 背包存档接口
 */
export interface BackpackSave {
    materials: Array<ItemSave>;
    equipments: Array<EquipmentSave>;
}
