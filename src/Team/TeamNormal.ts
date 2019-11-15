import { TeamConfiguration } from './TeamConfiguration';
import { CharacterNormal } from '../Character/CharacterNormal';

/**
 * 队伍(平常状态)
 */
export class TeamNormal extends TeamConfiguration {
    members: Array<CharacterNormal>;
    constructor() {
        super();
        this.members = new Array<CharacterNormal>(0);
    }
}
