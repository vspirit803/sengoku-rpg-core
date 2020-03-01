import { CharacterNormal } from './CharacterNormal';
import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterSave } from './CharacterSave';
import { Game, SaveInterface } from '@src/Game';

import commonEquipmentSlotsConfiguration from '@assets/data/commonEquipmentSlotsConfiguration.json';

/**
 * 角色中心
 */
export class CharacterCenter implements SaveInterface<Array<CharacterSave>> {
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
    loadConfiguration(characters: Array<CharacterConfiguration>): void {
        for (const eachCharacter of characters) {
            this.addCharacterConfiguration(eachCharacter);
            if (eachCharacter.id.startsWith('Enemy')) {
                this.loadCharacter(eachCharacter.id);
            }
        }
    }

    /**
     * 载入角色存档
     * @param characters 角色存档数组
     */
    loadSave(characters: Array<CharacterSave>): void {
        for (const eachCharacterSave of characters) {
            let eachCharacter = this.charactersMap.get(eachCharacterSave.id);
            if (eachCharacter === undefined) {
                eachCharacter = this.loadCharacter(eachCharacterSave.id);
            }
            eachCharacter.loadSave(eachCharacterSave);
        }
    }

    /**
     * 生成角色存档
     * @returns 角色存档数组Array<CharacterSave>
     */
    generateSave(): Array<CharacterSave> {
        return this.characters.map((eachCharacter) => {
            const characterSave: CharacterSave = { id: eachCharacter.id, level: eachCharacter.getLevel() };
            // 名字与配置不同(改过名)时,才会保存名字
            if (eachCharacter.name !== this.charactersConfigurationMap.get(eachCharacter.id)?.name) {
                characterSave.name = eachCharacter.name;
            }
            return characterSave;
        });
    }

    /**
     * 用角色配置初始化角色
     * @param id 角色id
     */
    private loadCharacter(id: string): CharacterNormal {
        const characterConfiguration = this.charactersConfigurationMap.get(id);
        if (characterConfiguration === undefined) {
            throw Error(`id为[${id}]的角色配置不存在`);
        }
        const character = new CharacterNormal({
            equipmentSlots: commonEquipmentSlotsConfiguration,
            ...characterConfiguration,
        });
        this.addCharacter(character);
        return character;
    }

    /**
     * 激活角色
     * @param id 角色id
     */
    unlockCharacter(id: string): void {
        this.loadCharacter(id);
        console.log(`激活了id为[${id}]的角色`);
    }

    /**
     * 获取角色
     * @param id 角色id
     */
    getCharacter(id: string): CharacterNormal {
        const character = this.charactersMap.get(id);
        if (character === undefined) {
            throw new Error(`id为${id}的角色未激活`);
        }
        return character;
    }
}
