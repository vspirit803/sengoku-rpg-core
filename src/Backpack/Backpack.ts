import { ItemBase } from '@/Item';

export class Backpack {
    /**背包物品 */
    items: Array<ItemBase>;

    constructor() {
        this.items = [];
    }

    /**
     * 往背包加入物品
     * @param item 要加入背包的物品
     */
    addItem(item: ItemBase): void {
        if (item.isStackable) {
            //可叠加
            const existItem = this.items.find((currItem) => {
                return currItem.id === item.id;
            });
            if (existItem) {
                //已经有该物品,增加数量
                existItem.count += item.count;
            } else {
                //没有该物品
                this.items.push(item);
            }
        } else {
            //没有该物品
            this.items.push(item);
        }
    }
}