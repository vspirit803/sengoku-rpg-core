import { UUID } from '@src/Common';
import { ItemEquipment } from '@src/Item';
import { Skill, SkillFactory } from '@src/Skill';
import { ObjectId } from 'bson';

import { CharacterConfiguration } from './CharacterConfiguration';
import { CharacterPropertyNormal } from './CharacterPropertyNormal';
import { CharacterSave } from './CharacterSave';
import { EquipmentSlot } from './EquipmentSlot';

/**
 * 角色类(平常状态)
 */
export class CharacterNormal implements UUID {
  uuid: string;
  id: string;
  name: string;
  level: number;
  properties: { [propName: string]: CharacterPropertyNormal };
  equipmentSlots: Array<EquipmentSlot>;
  skills: Array<Skill>;

  constructor(character: CharacterNormal);
  constructor(character: CharacterConfiguration);
  constructor(character: CharacterNormal | CharacterConfiguration) {
    this.uuid = new ObjectId().toHexString();
    this.id = character.id;
    this.name = character.name;
    this.properties = {};
    this.equipmentSlots = [];
    this.skills = [];

    if (character instanceof CharacterNormal) {
      this.level = character.level;
      this.properties = character.properties;
      this.equipmentSlots = character.equipmentSlots;
      this.skills = character.skills;
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
      this.skills = character.skills.map((eachId) => SkillFactory.getSkill(eachId));
    }
  }

  /**
   * 载入存档
   * @param eachCharacterSave 角色的存档数据
   */
  loadSave(eachCharacterSave: CharacterSave): void {
    this.name = eachCharacterSave.name ?? this.name;
    this.level = eachCharacterSave.level;
  }

  getLevel(): number {
    return this.level;
  }

  setLevel(level: number): void {
    this.level = level;
  }

  putOnEquipment(slot: EquipmentSlot, equipment: ItemEquipment): void {
    if (!slot.validEquipmentTypes.has(equipment.equipmentType)) {
      throw new Error(
        `try to put on Equipment[${equipment.equipmentType}] to Slot[${Array.from(slot.validEquipmentTypes).join(
          ',',
        )}]`,
      );
    }
    this.takeOffEquipment(slot);
    equipment.setWearer(this);
    for (const eachPropName in equipment.properties) {
      const eachProperty = equipment.properties[eachPropName];
      if (eachPropName in this.properties) {
        this.properties[eachPropName].equipmentValue += eachProperty.value;
      }
    }
  }

  takeOffEquipment(slot: EquipmentSlot): void {
    if (!slot.equipment) {
      return;
    }
    const equipment = slot.equipment;
    equipment.setWearer(undefined);
    for (const eachPropName in equipment.properties) {
      const eachProperty = equipment.properties[eachPropName];
      if (eachPropName in this.properties) {
        this.properties[eachPropName].equipmentValue -= eachProperty.value;
      }
    }
  }
}
