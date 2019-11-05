import { TeamConfiguration } from './TeamConfiguration';
import { CharacterNormal } from '../Character/CharacterNormal';

export class TeamNormal extends TeamConfiguration {
    members: Array<CharacterNormal>;
    constructor() {
        super();
        this.members = new Array<CharacterNormal>(0);
    }
}
