import { CharacterSave } from '@/Character';
import { BackpackSave } from '@/Item';

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
}
