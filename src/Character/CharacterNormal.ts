import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterPropertyNormal } from './CharacterPropertyNormal';
import { UUID } from '@/Common/UUID';
import { EquipmentSlot } from './EquipmentSlot';
import { CharacterSave } from './CharacterSave';

/**
 * 角色类(平常状态)
 */
export class CharacterNormal implements UUID {
    uuid: symbol;
    id: string;
    name: string;
    level: number;
    properties: { [propName: string]: CharacterPropertyNormal };
    equipmentSlots: Array<EquipmentSlot>;

    constructor(character: CharacterNormal);
    constructor(character: CharacterConfiguration);
    constructor(character: CharacterNormal | CharacterConfiguration) {
        this.uuid = Symbol('CharacterNormal');
        this.id = character.id;
        this.name = character.name;
        this.properties = {};
        this.equipmentSlots = [];

        if (character instanceof CharacterNormal) {
            this.level = character.level;
            this.properties = character.properties;
            this.equipmentSlots = character.equipmentSlots;
        } else {
            this.level = 0;
            for (const eachPropName in character.properties) {
                const eachProperty = character.properties[eachPropName];
                this.properties[eachPropName] = new CharacterPropertyNormal({
                    character: this,
                    property: eachProperty,
                });
            }
            this.equipmentSlots = character.equipmentSlots.map(
                (eachEquipmentSlotConfiguration) => new EquipmentSlot(eachEquipmentSlotConfiguration),
            );
        }

        // for (const eachEquipmentSlotConfiguration of character.equipmentSlots) {
        //     const eachEquipmentSlot = new EquipmentSlot(eachEquipmentSlotConfiguration);
        //     this.equipmentSlots.push(eachEquipmentSlot);
        // }
    }

    /**
     * 载入存档
     * @param eachCharacterSave 角色的存档数据
     */
    loadSave(eachCharacterSave: CharacterSave): void {
        this.name = eachCharacterSave.name ?? this.name;
        this.level = eachCharacterSave.level;
    }
}
