import { CharacterSave } from '@src/Character';
import { BackpackSave } from '@src/Item';
import { MapSave } from '@src/Map';
import { TeamSave } from '@src/Team/TeamSave';

/**
 * 游戏存档
 */
export interface GameSave {
    /**存档版本 */
    version: string;
    /**角色存档 */
    characters: Array<CharacterSave>;
    /**背包存档 */
    backpack: BackpackSave;
    /**地图存档 */
    maps: MapSave;
    /**队伍 */
    teams: Array<TeamSave>;
}
