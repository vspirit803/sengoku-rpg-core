import { ItemEquipment, EquipmentType } from '@/Item';
import { Rarity } from '@/Common/Rarity';
import { CharacterNormal } from '@/Character/CharacterNormal';

test('构造函数', () => {
    const item = new ItemEquipment({ id: 'Sword0001', name: '轩辕剑', equipmentType: EquipmentType.Weapon });
    expect(item.id).toEqual('Sword0001');
    expect(item.name).toEqual('轩辕剑');
    expect(item.equipmentType).toEqual(EquipmentType.Weapon);
    expect(item.wearer).toEqual(undefined);
    expect(item.rarity).toEqual(Rarity.Common);
});

test('setWearer', () => {
    const character = new CharacterNormal();
    const item = new ItemEquipment({
        id: 'Sword0001',
        name: '轩辕剑',
        equipmentType: EquipmentType.Weapon,
        rarity: Rarity.Legendary,
    });
    item.setWearer(character);
    expect(item.rarity).toBe(Rarity.Legendary);
    expect(item.wearer).toBe(character);
});
