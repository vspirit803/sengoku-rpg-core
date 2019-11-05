import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterPropertyNormal } from './CharacterPropertyNormal';

/**
 * 角色类(平常状态)
 */
export class CharacterNormal extends CharacterConfiguration {
    level: number;
    properties: { [propName: string]: CharacterPropertyNormal };
    constructor() {
        super();
        this.properties = {};
        this.level = 1;
    }
}
