import { ItemMaterial, ItemType } from '@src/Item';
import { Rarity } from '@src/Common';

test('默认值', () => {
    const itemMaterial = new ItemMaterial();
    expect(itemMaterial.count).toEqual(1);
    expect(itemMaterial.id).toEqual('Material00000');
    expect(itemMaterial.name).toEqual('未命名材料');
    expect(itemMaterial.type).toEqual(ItemType.Material);
    expect(itemMaterial.isStackable).toEqual(true);
});

test('传值', () => {
    const itemMaterial = new ItemMaterial({
        count: 50,
        id: 'brick',
        name: '砖块',
        rarity: Rarity.Common,
    });
    expect(itemMaterial.count).toEqual(50);
    expect(itemMaterial.id).toEqual('brick');
    expect(itemMaterial.name).toEqual('砖块');
    expect(itemMaterial.type).toEqual(ItemType.Material);
    expect(itemMaterial.rarity).toEqual(Rarity.Common);
    expect(itemMaterial.isStackable).toEqual(true);
});
