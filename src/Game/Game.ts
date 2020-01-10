import { GameSave } from './GameSave';
import { TaskCenter } from '@/Task';
import { Backpack } from '@/Backpack';
import { CharacterCenter } from '@/Character';
import characters from '@assets/characters.json';

/**
 * 游戏的实例
 */
export class Game {
    /**角色中心 */
    characterCenter: CharacterCenter;

    /**任务中心  */
    taskCenter: TaskCenter;

    /**背包 */
    backpack: Backpack;

    constructor() {
        //初始化角色中心
        this.characterCenter = new CharacterCenter();
        this.characterCenter.setGame(this);
        this.characterCenter.loadCharactersConfiguration(characters);

        //初始化任务中心
        this.taskCenter = new TaskCenter();
        this.taskCenter.setGame(this);

        //初始化背包
        this.backpack = new Backpack();
        this.backpack.setGame(this);
    }

    /**
     * 载入存档
     * @param gameSave 存档数据
     */
    loadSave(gameSave: GameSave): void {
        this.characterCenter.loadSave(gameSave.charactersSave);
    }
}
