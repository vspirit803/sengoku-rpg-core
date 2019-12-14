import { CharacterBattle } from '../Character/CharacterBattle';

/**
 * 状态的基类
 */
export class StatusBase {
    /**状态的来源角色 */
    source: CharacterBattle;
    /**状态的目标角色 */
    target: CharacterBattle;
    /**持续时间 */
    duration: number | 'forever';
    // /**冷却时间 */
    // cooldown: number | 'forever';
    // /**当前冷却时间 */
    // currCooldown: number | 'forever';
    constructor({
        source,
        target,
        duration = 'forever',
        // cooldown = 0,
        // currCooldown = 0,
    }: {
        source: CharacterBattle;
        target: CharacterBattle;
        duration?: number | 'forever';
        // cooldown: number | 'forever';
        // currCooldown: number | 'forever';
    }) {
        this.source = source;
        this.target = target;
        this.duration = duration;
        // this.cooldown = cooldown;
        // this.currCooldown = currCooldown;
    }
}
