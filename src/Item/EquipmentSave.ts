import { ItemSave } from './ItemSave';

/**
 * 装备存档
 */
export interface EquipmentSave extends ItemSave {
    // /**装备id */
    // id: string;
    /**穿戴装备的角色id */
    wearerId?: string;
    /**装备属性 */
    properties: { [propName: string]: number };
}
