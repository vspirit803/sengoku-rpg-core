import { GameSave } from './GameSave';
import { TaskCenter } from '@/Task';
import { ItemCenter } from '@/Item';
import { CharacterCenter } from '@/Character';
import characters from '@assets/configurations/characters.json';
import battles from '@assets/configurations/battles.json';
import { BattleCenter } from '@/Battle';

/**
 * 游戏的实例
 */
export class Game {
    /**角色中心 */
    characterCenter: CharacterCenter;
    /**任务中心  */
    taskCenter: TaskCenter;
    /**背包 */
    backpack: ItemCenter;
    /**战斗中心 */
    battleCenter: BattleCenter;

    constructor() {
        //初始化角色中心
        this.characterCenter = new CharacterCenter();
        this.characterCenter.setGame(this);
        this.characterCenter.loadConfiguration(characters);

        //初始化任务中心
        this.taskCenter = new TaskCenter();
        this.taskCenter.setGame(this);

        //初始化背包
        this.backpack = new ItemCenter();
        this.backpack.setGame(this);

        this.battleCenter = new BattleCenter(this);
        this.battleCenter.loadConfiguration(battles);
        // this.battleCenter.setGame(this);
    }

    /**
     * 载入存档
     * @param gameSave 存档数据
     */
    loadSave(gameSave: GameSave): void {
        this.characterCenter.loadSave(gameSave.characters);
        this.backpack.loadSave(gameSave.backpack);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateSave(): GameSave {
        return {
            version: '0.0.1',
            characters: this.characterCenter.generateSave(),
            backpack: this.backpack.generateSave(),
        };
    }
}
