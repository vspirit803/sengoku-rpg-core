import { CharacterNormal } from '../Character/CharacterNormal';
import { TaskCenter } from '@/Task';
import { Backpack } from '@/Backpack';

/**
 * 游戏的实例
 */
export class Game {
    /**角色列表 */
    characters: Array<CharacterNormal>;

    /**角色id到角色实例的映射 */
    charactersMap: { [characterId: string]: CharacterNormal };

    /**任务中心  */
    taskCenter: TaskCenter;

    /**背包 */
    backpack: Backpack;

    constructor() {
        this.characters = [];
        this.charactersMap = {};
        this.taskCenter = new TaskCenter();
        this.backpack = new Backpack();
    }
}
