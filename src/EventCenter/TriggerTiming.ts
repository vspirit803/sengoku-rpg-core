/**事件触发时机 */
export enum TriggerTiming {
    /**战斗开始时 */
    BattleStart,
    /**回合开始时 */
    RoundStart,
    /**行动开始时 */
    ActionStart,
    /**施放技能时 */
    Spelling,
    /**攻击时 */
    Attacking,
    /**受到攻击时 */
    Attacked,
    /**造成伤害时 */
    Damaging,
    /**受到伤害时 */
    Damaged,
    /**造成击杀时 */
    Killing,
    /**受到击杀时 */
    Killed,
    /**行动结束后 */
    ActionEnd,
    /**回合结束后 */
    RoundEnd
}
