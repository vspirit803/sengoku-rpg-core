import { ItemSystem, ItemType } from '@src/Item';
import { Rarity } from '@src/Common/Rarity';

test('默认值', () => {
    const item = new ItemSystem();
    expect(item.count).toEqual(1);
    expect(item.id).toEqual('ItemSystem00000');
    expect(item.name).toEqual('未命名系统物品');
    expect(item.type).toEqual(ItemType.System);
    expect(item.isStackable).toEqual(true);
});

test('传值', () => {
    const item = new ItemSystem({
        id: '天下布武印章',
        name: '天下布武',
        rarity: Rarity.Immortal,
        isStackable: false,
    });
    expect(item.count).toEqual(1);
    expect(item.id).toEqual('天下布武印章');
    expect(item.name).toEqual('天下布武');
    expect(item.type).toEqual(ItemType.System);
    expect(item.rarity).toEqual(Rarity.Immortal);
    expect(item.isStackable).toEqual(false);
});
