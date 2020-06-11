import { CharacterNormal } from '@src/Character';
import { Rarity } from '@src/Common';
import { EquipmentType, ItemEquipment } from '@src/Item';

test('构造函数', () => {
    const item = new ItemEquipment({
        id: 'Sword0001',
        name: '轩辕剑',
        equipmentType: EquipmentType.Weapon,
        rarity: Rarity.Ancient,
        level: 100,
        properties: { atk: { min: 1000, max: 1000, value: 1000 } },
    });
    expect(item.id).toEqual('Sword0001');
    expect(item.name).toEqual('轩辕剑');
    expect(item.equipmentType).toEqual(EquipmentType.Weapon);
    expect(item.wearer).toEqual(undefined);
    expect(item.rarity).toEqual(Rarity.Ancient);
});

test('setWearer', () => {
    const character = new CharacterNormal({
        id: 'C0001',
        name: '织田信长',
        properties: { atk: { baseValue: 10, increaseValue: 5 } },
        equipmentSlots: [],
        skills: [],
    });
    const item = new ItemEquipment({
        id: 'Sword0001',
        name: '轩辕剑',
        equipmentType: EquipmentType.Weapon,
        rarity: Rarity.Ancient,
        level: 100,
        properties: { atk: { min: 1000, max: 1000, value: 1000 } },
    });
    item.setWearer(character);
    expect(item.wearer).toBe(character);
});
