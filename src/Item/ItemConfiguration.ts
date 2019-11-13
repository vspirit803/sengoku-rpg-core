/**
 * 物品(配置)
 */
export class ItemConfiguration {
    id: string; //物品配置id
    name: string; //物品名称
    isStackable: boolean; //能否堆叠
    constructor() {
        this.id = 'Item.0001';
        this.name = '未命名物品';
        this.isStackable = false;
    }
}
