import { TeamNormal } from './TeamNormal';
import { TeamSave } from './TeamSave';
import { SaveInterface, Game } from '@src/Game';

/**
 * 队伍中心
 */
export class TeamCenter implements SaveInterface<Array<TeamSave>> {
    /**绑定的游戏实例 */
    private game?: Game;
    teams: Array<TeamNormal>;
    constructor(game?: Game) {
        this.teams = [];
        if (game) {
            this.game = game;
        } else {
            console.warn('之后将修改构造方法,强制使用带game参数的构造函数初始化实例');
        }
    }

    /**
     * 绑定游戏实例
     * @param game 要绑定的游戏实例
     */
    setGame(game: Game): void {
        this.game = game;
    }

    /**载入存档 */
    loadSave(saveData: Array<TeamSave>): void {
        for (const eachTeam of saveData) {
            if (this.game === undefined) {
                throw new Error('未绑定Game实例就试图载入存档');
            }
            const memberIds = eachTeam.members.map((eachMember) => {
                return {
                    id: eachMember,
                };
            });
            const team = new TeamNormal({ name: eachTeam.name, members: memberIds }, this.game);
            this.teams.push(team);
        }
    }

    /**生成存档 */
    generateSave(): Array<TeamSave> {
        return this.teams.map((eachTeam) => {
            const teamSave: TeamSave = {
                name: eachTeam.name,
                members: eachTeam.members.map((eachMember) => eachMember.id),
            };
            return teamSave;
        });
    }
}
