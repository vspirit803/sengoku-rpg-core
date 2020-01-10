import { CharacterNormal } from './CharacterNormal';
import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterSave } from './CharacterSave';
import { Game } from '@/Game';

/**
 * 角色中心
 */
export class CharacterCenter {
    /**绑定的游戏实例 */
    private game?: Game;

    /**角色配置列表 */
    charactersConfiguration: Array<CharacterConfiguration>;

    /**角色配置映射 */
    charactersConfigurationMap: Map<string, CharacterConfiguration>;

    /**角色列表 */
    characters: Array<CharacterNormal>;

    /**角色id到角色实例的映射 */
    charactersMap: Map<string, CharacterNormal>;

    constructor() {
        this.charactersConfiguration = [];
        this.charactersConfigurationMap = new Map<string, CharacterConfiguration>();
        this.characters = [];
        this.charactersMap = new Map<string, CharacterNormal>();
    }

    /**
     * 绑定游戏实例
     * @param game 要绑定的游戏实例
     */
    setGame(game: Game): void {
        this.game = game;
    }

    /**
     * 将角色配置添加进列表
     * @param character 要添加的角色
     */
    private addCharacterConfiguration(character: CharacterConfiguration): void {
        this.charactersConfigurationMap.set(character.id, character);
        this.charactersConfiguration.push(character);
    }

    /**
     * 将角色添加进列表
     * @param character 要添加的角色
     */
    private addCharacter(character: CharacterNormal): void {
        this.charactersMap.set(character.id, character);
        this.characters.push(character);
    }

    /**
     * 载入角色配置
     * @param characters 角色配置数组
     */
    loadCharactersConfiguration(characters: Array<CharacterConfiguration>): void {
        for (const eachCharacter of characters) {
            this.addCharacterConfiguration(eachCharacter);
        }
    }

    /**
     * 载入角色存档
     * @param characters 角色存档数组
     */
    loadSave(characters: Array<CharacterSave>): void {
        for (const eachCharacterSave of characters) {
            const eachCharacterConfiguration = this.charactersConfigurationMap.get(eachCharacterSave.id);
            if (eachCharacterConfiguration === undefined) {
                throw Error(`id为[${eachCharacterSave.id}]的角色配置不存在`);
            }
            const eachCharacter: CharacterNormal = new CharacterNormal({
                character: eachCharacterConfiguration,
                level: eachCharacterSave.level,
            });
            this.addCharacter(eachCharacter);
        }
    }
}
