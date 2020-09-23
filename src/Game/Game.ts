import battles from '@assets/data/battles.json';
import characters from '@assets/data/characters.json';
import cities from '@assets/data/cities.json';
import equipments from '@assets/data/items/equipments.json';
import maps from '@assets/data/maps.json';
import provinces from '@assets/data/provinces.json';
import skills from '@assets/data/skills.json';
import { BattleCenter } from '@src/Battle';
import { CharacterCenter } from '@src/Character';
import { ItemCenter } from '@src/Item';
import { MapCenter } from '@src/Map';
import { SkillFactory } from '@src/Skill';
import { TaskCenter } from '@src/Task';
import { TeamCenter } from '@src/Team';

import { GameSave } from './GameSave';

/**
 * 游戏的实例
 */
export class Game {
  /**角色中心 */
  static characterCenter: CharacterCenter;
  /**任务中心  */
  static taskCenter: TaskCenter;
  /**背包 */
  static backpack: ItemCenter;
  /**战斗中心 */
  static battleCenter: BattleCenter;
  /**地图中心 */
  static mapCenter: MapCenter;
  /**队伍中心 */
  static teamCenter: TeamCenter;

  static init() {
    SkillFactory.loadConfiguration(skills);

    //初始化角色中心
    Game.characterCenter = new CharacterCenter();
    Game.characterCenter.loadConfiguration(characters);

    //初始化任务中心
    Game.taskCenter = new TaskCenter();

    //初始化背包
    Game.backpack = new ItemCenter();
    Game.backpack.equipmentCenter.loadConfiguration(equipments);

    //初始化战斗中心
    Game.battleCenter = new BattleCenter();
    Game.battleCenter.loadConfiguration(battles);

    //初始化地图中心
    Game.mapCenter = new MapCenter();
    Game.mapCenter.loadCitiesConfiguration(cities);
    Game.mapCenter.loadProvincesConfiguration(provinces);
    Game.mapCenter.loadMapsConfiguration(maps);

    //初始化队伍中心
    Game.teamCenter = new TeamCenter();
  }

  /**
   * 载入存档
   * @param gameSave 存档数据
   */
  static loadSave(gameSave: GameSave): void {
    Game.characterCenter.loadSave(gameSave.characters);
    Game.backpack.loadSave(gameSave.backpack);
    Game.mapCenter.loadSave(gameSave.maps);
    Game.teamCenter.loadSave(gameSave.teams);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static generateSave(): GameSave {
    return {
      version: '0.0.1',
      characters: Game.characterCenter.generateSave(),
      backpack: Game.backpack.generateSave(),
      maps: Game.mapCenter.generateSave(),
      teams: Game.teamCenter.generateSave(),
    };
  }
}
