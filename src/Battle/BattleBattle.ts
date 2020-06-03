import { BattleActionQueueBase, BattleActionQueueMHXY } from '@src/BattleActionQueue';
import { CharacterBattle } from '@src/Character';
import { UUID } from '@src/Common';
import { Condition } from '@src/Condition';
import { Event, EventCenter, TriggerTiming } from '@src/EventCenter';
import { FactionBattle } from '@src/Faction';
import { Game } from '@src/Game';
import { TeamBattle, TeamNormal } from '@src/Team';

import { BattleConfiguration } from './BattleConfiguration';

/**
 * 战斗(战斗状态)
 */
export class BattleBattle implements UUID {
    uuid: symbol;
    name: string;
    /**
     * 阵营,每个阵营都是互为敌人
     * 玩家所在的队伍固定为factions[0]的teams[0]
     */
    factions: Array<FactionBattle>;
    eventCenter: EventCenter;
    successCondition: Condition;
    battleActionQueue: BattleActionQueueBase;
    /**
     * 自动模式
     */
    autoMode: boolean;

    constructor(
        battleConfiguration: BattleConfiguration,
        game: Game,
        playerTeam: TeamNormal,
        successCondition: Condition,
    );

    constructor(
        battleConfiguration?: BattleConfiguration,
        game?: Game,
        playerTeam?: TeamNormal,
        successCondition?: Condition,
    ) {
        this.uuid = Symbol('BattleBattle');
        this.name = battleConfiguration?.name ?? '未留下名字的战斗';
        this.factions = [];
        this.eventCenter = new EventCenter();
        this.successCondition = successCondition ?? new Condition();
        this.autoMode = false;
        if (battleConfiguration && game && playerTeam) {
            this.name = battleConfiguration.name;
            this.addFactions(
                ...battleConfiguration.factions.map(
                    (eachFactionConfiguration) => new FactionBattle(eachFactionConfiguration, game),
                ),
            );
            this.factions[0].setPlayerTeam(new TeamBattle(playerTeam, game));
        }
        this.battleActionQueue = new BattleActionQueueMHXY(this);
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
        this.eventCenter.trigger(
            new Event({
                type: TriggerTiming.BattleStart,
                source: this,
                data: {
                    battle: this,
                },
            }),
        );

        // eslint-disable-next-line no-constant-condition
        while (true) {
            const character = this.battleActionQueue.getNext();
            this.eventCenter.trigger(
                new Event({
                    type: TriggerTiming.ActionStart,
                    source: character,
                    data: {
                        source: character,
                    },
                }),
            );

            await character.action();
            // await new Promise((resolve) => {
            //     setTimeout(() => {
            //         resolve();
            //     }, 100);
            // });

            if (this.successCondition.isCompleted) {
                this.eventCenter.trigger(
                    new Event({
                        type: TriggerTiming.BattleSuccess,
                        source: this,
                        data: {
                            battle: this,
                            round: this.battleActionQueue.roundCount,
                            killed: this.characters
                                .filter((eachCharacter) => eachCharacter.faction !== this.factions[0])
                                .filter((eachCharacter) => !eachCharacter.isAlive),
                            // .map((eachCharacter) => eachCharacter.id),
                        },
                    }),
                );
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
