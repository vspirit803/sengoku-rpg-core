import { CharacterPropertyConfiguration } from './CharacterPropertyConfiguration';

/**
 * 角色类(配置)
 */
export class CharacterConfiguration {
    id: string;
    name: string;
    properties: { [propName: string]: CharacterPropertyConfiguration };
    constructor() {
        this.id = '';
        this.name = '未命名角色';
        this.properties = {};
    }
}
