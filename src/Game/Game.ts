import { CharacterNormal } from '../Character/CharacterNormal';

/**
 * 游戏的实例
 */
export class Game {
    characters: Array<CharacterNormal>; //角色列表
    charactersMap: { [characterId: string]: CharacterNormal }; //角色id到角色实例的映射
    constructor() {
        this.characters = new Array<CharacterNormal>(0);
        this.charactersMap = {};
    }
}
