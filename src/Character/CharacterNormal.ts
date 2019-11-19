import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterPropertyNormal } from './CharacterPropertyNormal';
import { UUID } from '../Common/UUID';

/**
 * 角色类(平常状态)
 */
export class CharacterNormal extends CharacterConfiguration implements UUID {
    level: number;
    uuid: symbol;
    properties: { [propName: string]: CharacterPropertyNormal };
    constructor() {
        super();
        this.uuid = Symbol('CharacterNormal');
        this.properties = {};
        this.level = 1;
    }
}
