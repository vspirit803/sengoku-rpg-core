import { TeamConfiguration } from './TeamConfiguration';
import { CharacterNormal } from '../Character/CharacterNormal';
import { Game } from '@/Game';

/**
 * 队伍(平常状态)
 */
export class TeamNormal {
    /**队伍名称 */
    name: string;
    // /**队伍id */
    // id: string;
    /**队伍成员 */
    members: Array<CharacterNormal>;
    // /**队伍成员Id */
    constructor(members: Array<CharacterNormal>, game: Game);
    constructor(teamConfiguration: TeamConfiguration, game: Game);
    constructor(teamConfiguration: TeamConfiguration | Array<CharacterNormal>, game: Game) {
        if ('length' in teamConfiguration) {
            this.name = '玩家队伍';
            this.members = teamConfiguration;
            return;
        }
        this.name = teamConfiguration.name;
        // this.id = teamConfiguration.id;
        this.members = teamConfiguration.members.map((eachMember) => {
            let character;
            if ('properties' in eachMember) {
                //配置
                character = new CharacterNormal(eachMember);
            } else {
                //id
                character = game.characterCenter.getCharacter(eachMember.id);
            }
            eachMember.level && character.setLevel(eachMember.level);
            return character;
        });
    }
}
