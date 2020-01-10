import { ItemEquipment } from './ItemEquipment';
import { EquipmentType } from './EquipmentType';
import { EquipmentProperty } from './EquipmentProperty';
import { Rarity } from '@/Common/Rarity';
import rarityRate from '@assets/ItemRarityRate.json';

/**
 * 装备工厂
 */
export function generateEquipment({
    id,
    name,
    equipmentType,
    rarity,
    level,
}: {
    id: string;
    name: string;
    equipmentType: EquipmentType;
    rarity?: Rarity;
    level?: number;
}): ItemEquipment {
    if (rarity === undefined) {
        const r = Math.random();
        if (r < rarityRate.Immortal.stackRate) {
            rarity = Rarity.Immortal;
        } else if (r < rarityRate.Legendary.stackRate) {
            rarity = Rarity.Legendary;
        } else if (r < rarityRate.Mythical.stackRate) {
            rarity = Rarity.Mythical;
        } else if (r < rarityRate.Rare.stackRate) {
            rarity = Rarity.Rare;
        } else {
            rarity = Rarity.Common;
        }
    }

    if (level === undefined) {
        level = Math.round(Math.random() * 20) * 5;
    }
    const rarityRange = rarityRate as { [rarity: string]: { min: number; max: number } };
    equipmentType = EquipmentType.Weapon;
    const { min: minRatio, max: maxRatio } = { ...rarityRange[Rarity[rarity]] };
    const minValue = Math.round(Math.sin((0.01 * level - 0.5) * Math.PI + 1) * 500 * minRatio);
    const maxValue = Math.round(Math.sin((0.01 * level - 0.5) * Math.PI + 1) * 500 * maxRatio);
    const value = Math.round((maxValue - minValue) * Math.random()) + minValue;
    const properties = { atk: new EquipmentProperty({ value }) };

    return new ItemEquipment({ id, name, rarity, equipmentType, level, properties });
}
