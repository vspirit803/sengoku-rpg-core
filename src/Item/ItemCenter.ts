import { ItemBase } from './ItemBase';
import { Game, SaveInterface } from '@src/Game';
import { EquipmentCenter } from './EquipmentCenter';
import { BackpackSave } from './BackpackSave';

/**
 * 物品中心(背包)
 */
export class ItemCenter implements SaveInterface<BackpackSave> {
    /**绑定的游戏实例 */
    private game?: Game;

    /**背包物品 */
    items: Array<ItemBase>;

    equipmentCenter: EquipmentCenter;

    constructor() {
        this.items = [];
        this.equipmentCenter = new EquipmentCenter();
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

    /**
     * 绑定游戏实例
     * @param game 要绑定的游戏实例
     */
    setGame(game: Game): void {
        this.game = game;
    }

    loadSave(saveData: BackpackSave): void {
        this.equipmentCenter.loadSave(saveData.equipments);
    }

    generateSave(): BackpackSave {
        return {
            equipments: this.equipmentCenter.generateSave(),
            materials: [],
        };
    }
}
