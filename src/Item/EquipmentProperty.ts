/**
 * 装备属性类
 */
export class EquipmentProperty {
    value: number;
    constructor({ value = 0 }: { value?: number } = {}) {
        this.value = value;
    }
}
