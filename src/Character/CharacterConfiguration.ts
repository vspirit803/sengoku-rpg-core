import { CharacterPropertyConfiguration } from './CharacterPropertyConfiguration';

/**
 * 角色类(配置)
 */
export class CharacterConfiguration {
    id: string;
    name: string;
    properties: { [propName: string]: CharacterPropertyConfiguration };
    constructor(
        {
            id = '',
            name = '未命名角色',
            properties = {},
        }: {
            id?: string;
            name?: string;
            properties?: { [propName: string]: CharacterPropertyConfiguration };
        } = {
            id: '',
            name: '未命名角色',
            properties: {},
        },
    ) {
        this.id = id;
        this.name = name;
        this.properties = properties;
    }
}
