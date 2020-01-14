import { BattleConfiguration } from './BattleConfiguration';
import { BattleBattle } from './BattleBattle';
import { Game } from '@/Game';
import { TeamNormal } from '@/Team';

/**
 * 战斗中心
 */
export class BattleCenter {
    battles: Array<BattleConfiguration>;
    battlesMap: Map<string, BattleConfiguration>;
    private game: Game;

    constructor(game: Game) {
        this.game = game;
        this.battles = [];
        this.battlesMap = new Map<string, BattleConfiguration>();
    }

    /**
     * 载入战斗配置
     * @param battles 咱都配置数组
     */
    loadConfiguration(battles: Array<BattleConfiguration>): void {
        for (const eachBattle of battles) {
            this.battles.push(eachBattle);
            this.battlesMap.set(eachBattle.id, eachBattle);
        }
    }

    generateBattle(id: string): BattleBattle {
        const game = this.game!;
        const battleConfiguration = this.battlesMap.get(id);
        if (battleConfiguration === undefined) {
            throw new Error(`id为[${id}]的战斗配置不存在`);
        }
        const battle = new BattleBattle(
            battleConfiguration,
            game,
            new TeamNormal(
                [
                    game.characterCenter.getCharacter('C0001'),
                    game.characterCenter.getCharacter('C0002'),
                    game.characterCenter.getCharacter('C0003'),
                ],
                game,
            ),
        );
        return battle;
    }

    /**
     * 绑定游戏实例
     * @param game 要绑定的游戏实例
     */
    setGame(game: Game): void {
        this.game = game;
    }
}
