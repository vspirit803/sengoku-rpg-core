/**
 * 物品(配置)
 */
export class ItemConfiguration {
    id: string; //物品配置id
    name: string; //物品名称
    isStackable: boolean; //能否堆叠
    constructor({
        id = 'Item00000',
        name = '未命名物品',
        isStackable = false,
    }: { id?: string; name?: string; isStackable?: boolean } = {}) {
        this.id = id;
        this.name = name;
        this.isStackable = isStackable;
    }
}
