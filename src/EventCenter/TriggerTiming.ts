/**事件触发时机 */
export enum TriggerTiming {
    /**战斗开始时 */
    BattleStart = 'BattleStart',
    /**回合开始时 */
    RoundStart = 'RoundStart',
    /**行动开始时 */
    ActionStart = 'ActionStart',
    /**施放技能时 */
    Spelling = 'Spelling',
    /**攻击时 */
    Attacking = 'Attacking',
    /**受到攻击时 */
    Attacked = 'Attacked',
    /**造成伤害时 */
    Damaging = 'Damaging',
    /**受到伤害时 */
    Damaged = 'Damaged',
    /**造成击杀时 */
    Killing = 'Killing',
    /**受到击杀时 */
    Killed = 'Killed',
    /**行动结束后 */
    ActionEnd = 'ActionEnd',
    /**回合结束后 */
    RoundEnd = 'RoundEnd',
    /**战斗胜利 */
    BattleSuccess = 'BattleSuccess',
}
