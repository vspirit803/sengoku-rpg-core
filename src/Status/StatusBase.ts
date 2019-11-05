import { CharacterBattle } from '../Character/CharacterBattle';

/**
 * 状态的基类
 */
export class StatusBase {
    character: CharacterBattle; //状态的所有者
    duration: number | 'forever';
    constructor({ character }: { character: CharacterBattle }) {
        this.character = character;
        this.duration = 'forever';
    }
}
