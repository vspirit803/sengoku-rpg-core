import { GameSave } from './GameSave';
import { TaskCenter } from '@src/Task';
import { ItemCenter } from '@src/Item';
import { CharacterCenter } from '@src/Character';
import { BattleCenter } from '@src/Battle';
import { MapCenter } from '@src/Map';

import characters from '@assets/configurations/characters.json';
import battles from '@assets/configurations/battles.json';
import equipments from '@assets/configurations/items/equipments.json';

import maps from '@assets/configurations/maps.json';
import cities from '@assets/configurations/cities.json';
import provinces from '@assets/configurations/provinces.json';

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
    /**地图中心 */
    mapCenter: MapCenter;

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
        this.backpack.equipmentCenter.loadConfiguration(equipments);

        //初始化战斗中心
        this.battleCenter = new BattleCenter(this);
        this.battleCenter.loadConfiguration(battles);
        this.battleCenter.setGame(this);

        this.mapCenter = new MapCenter();
        this.mapCenter.loadCitiesConfiguration(cities);
        this.mapCenter.loadProvincesConfiguration(provinces);
        this.mapCenter.loadMapsConfiguration(maps);
    }

    /**
     * 载入存档
     * @param gameSave 存档数据
     */
    loadSave(gameSave: GameSave): void {
        this.characterCenter.loadSave(gameSave.characters);
        this.backpack.loadSave(gameSave.backpack);
        this.mapCenter.loadSave(gameSave.maps);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generateSave(): GameSave {
        return {
            version: '0.0.1',
            characters: this.characterCenter.generateSave(),
            backpack: this.backpack.generateSave(),
            maps: this.mapCenter.generateSave(),
        };
    }
}
