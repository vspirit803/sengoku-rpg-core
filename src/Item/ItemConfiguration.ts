/**
 * 物品配置接口
 */
export interface ItemConfiguration {
    /**配置id */
    id: string;
    /**名称 */
    name: string;
    /**类别 */
    type: string;
    /**能否堆叠 */
    isStackable: boolean;
    /**稀有度 */
    rarity: string;
}
