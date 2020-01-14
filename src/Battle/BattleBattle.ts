import { FactionBattle } from '../Faction/FactionBattle';
import { CharacterBattle } from '../Character/CharacterBattle';
import { EventCenter } from '../EventCenter/EventCenter';
import { BattleActionQueueMHXY } from '../BattleActionQueue/BattleActionQueueMHXY';
import { BattleActionQueueBase } from '../BattleActionQueue/BattleActionQueueBase';
import { BattleConfiguration } from './BattleConfiguration';
import { Game } from '@/Game';
import { TeamNormal, TeamBattle } from '@/Team';

/**
 * 战斗(战斗状态)
 */
export class BattleBattle {
    name: string;
    /**
     * 阵营,每个阵营都是互为敌人
     * 玩家所在的队伍固定为factions[0]的teams[0]
     */
    factions: Array<FactionBattle>;
    eventCenter: EventCenter;

    constructor(battleConfiguration: BattleConfiguration, game: Game, playerTeam: TeamNormal);
    constructor(battleConfiguration?: BattleConfiguration, game?: Game, playerTeam?: TeamNormal) {
        this.name = battleConfiguration?.name ?? '未留下名字的战斗';
        this.factions = [];
        this.eventCenter = new EventCenter();
        if (battleConfiguration && game && playerTeam) {
            this.name = battleConfiguration.name;
            this.addFactions(
                ...battleConfiguration.factions.map(
                    (eachFactionConfiguration) => new FactionBattle(eachFactionConfiguration, game),
                ),
            );
            this.factions[0].setPlayerTeam(new TeamBattle(playerTeam, game));
        }
    }

    get characters(): Array<CharacterBattle> {
        return this.factions
            .map((eachFaction) => {
                return eachFaction.characters;
            })
            .reduce((prev, curr) => {
                return [...prev, ...curr];
            });
    }

    addFactions(...factions: Array<FactionBattle>): void {
        factions.forEach((eachFaction) => {
            this.factions.push(eachFaction);
            eachFaction.setBattle(this);
        });
    }

    async start(): Promise<void> {
        console.log(
            `[${this.factions[0].name}]与[${this.factions[1].name}]两个阵营的矛盾终于暴发了,被后世称为[${this.name}]的战斗正式打响`,
        );
        const battleActionQueue: BattleActionQueueBase = new BattleActionQueueMHXY();
        battleActionQueue.battle = this;
        battleActionQueue.init();
        while (true) {
            const character = battleActionQueue.getNext();
            character.action();
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            });

            const enemies = this.factions.filter((eachFaction) => {
                return eachFaction !== this.factions[0];
            });

            if (!enemies.some((eachFaction) => eachFaction.isAlive)) {
                console.log('赢了');
                break;
            }
            if (!this.factions[0].isAlive) {
                //所有友军死亡
                console.log('输了');
                break;
            }
        }
    }
}
