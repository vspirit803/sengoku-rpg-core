import { CharacterBattle } from '../Character/CharacterBattle';

/**
 * 状态的基类
 */
export class StatusBase {
    source: CharacterBattle; //状态的来源角色
    target: CharacterBattle; //状态的目标角色
    duration: number | 'forever'; //持续时间
    constructor({ source, target }: { source: CharacterBattle; target: CharacterBattle }) {
        this.source = source;
        this.target = target;
        this.duration = 'forever';
    }
}
