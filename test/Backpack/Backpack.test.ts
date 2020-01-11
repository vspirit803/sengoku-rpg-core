import { ItemSystem, ItemCenter } from '@/Item';
import { Rarity } from '@/Common/Rarity';

test('添加背包', () => {
    const backpack = new ItemCenter();
    backpack.addItem(new ItemSystem({ id: 'money', name: '金钱', count: 114514, rarity: Rarity.Immortal }));
    expect(backpack.items.length).toEqual(1);
    backpack.addItem(new ItemSystem({ id: 'exp', name: '经验值', count: 100, rarity: Rarity.Immortal }));
    expect(backpack.items.length).toEqual(2);
    backpack.addItem(new ItemSystem({ id: 'money', name: '金钱', count: 666666, rarity: Rarity.Immortal }));
    expect(backpack.items.length).toEqual(2);
    backpack.addItem(
        new ItemSystem({ id: 'taskItem0001', name: '昆仑镜', isStackable: false, rarity: Rarity.Immortal }),
    );
    expect(backpack.items.length).toEqual(3);
});
