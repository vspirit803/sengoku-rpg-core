import { CharacterNormal } from './CharacterNormal';
import { CharacterConfiguration } from './CharacterConfiguration';

import characters from '@/../assets/characters.json';

export class CharacterCenter {
    charactersConfiguration: Array<CharacterConfiguration>;
    // charactersConfigurationMap: { [characterId: string]: CharacterConfiguration };
    charactersConfigurationMap: Map<string, CharacterConfiguration>;
    /**角色列表 */
    characters: Array<CharacterNormal>;

    /**角色id到角色实例的映射 */
    // charactersMap: { [characterId: string]: CharacterNormal };
    charactersMap: Map<string, CharacterNormal>;

    constructor() {
        this.characters = [];
        // this.charactersMap = {};
        this.charactersMap = new Map<string, CharacterNormal>();
        this.charactersConfiguration = [];
        // this.charactersConfigurationMap = {};
        this.charactersConfigurationMap = new Map<string, CharacterConfiguration>();
        for (const eachCharacter of characters) {
            const eachCharacterConfiguration = new CharacterConfiguration({
                id: eachCharacter.id,
                name: eachCharacter.name,
                properties: eachCharacter.properties,
            });
            this.charactersConfiguration.push(eachCharacterConfiguration);
            this.charactersConfigurationMap.set(eachCharacter.id, eachCharacterConfiguration);
            // this.charactersConfigurationMap[eachCharacter.id] = eachCharacterConfiguration;
        }

        const nobu = this.charactersConfiguration[0];
        this.characters.push(new CharacterNormal({ character: nobu, level: 50 }));
    }
}
