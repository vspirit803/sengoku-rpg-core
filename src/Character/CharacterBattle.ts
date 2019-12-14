import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyBattle } from './CharacterPropertyBattle';
import { TeamBattle } from '../Team/TeamBattle';
import { FactionBattle } from '../Faction/FactionBattle';
import { BattleBattle } from '../Battle/BattleBattle';
import { Subscriber } from '../EventCenter/Subscriber';
import { eventCenter } from '../EventCenter/EventCenter';
import { Event } from '../EventCenter/Event';
import { TriggerTiming } from '../EventCenter/TriggerTiming';
import { Status } from '../Status/Status';
import { SubscriberFactory } from '../EventCenter/SubscriberFactory';
import { EventDataAttacking } from '../EventCenter/EventData';

/**
 * 角色类(战斗状态)
 */
export class CharacterBattle extends CharacterNormal {
    /**角色所处的队伍 */
    team?: TeamBattle;
    /**角色所处的阵营 */
    faction?: FactionBattle;
    /**角色所处的战斗 */
    battle?: BattleBattle;
    /**角色的属性(战斗模式) */
    properties: { [propName: string]: CharacterPropertyBattle };
    /**当前血量 */
    currHp: number;
    /**是否存活 */
    isAlive: boolean;
    /**是否被沉默 */
    isSilence: boolean;
    /**是否被眩晕 */
    isStunned: boolean;
    /**基本战斗事件订阅者 */
    baseBattleEventSubscribers: { [eventName: string]: Subscriber };
    /**状态数组 */
    statuses: Array<Status>;

    constructor({ character = new CharacterNormal() }: { character?: CharacterNormal } = {}) {
        super({ character, level: character.level });
        this.uuid = Symbol('CharacterBattle');
        this.properties = {};
        for (const eachPropName in character.properties) {
            const eachProperty = character.properties[eachPropName];
            this.properties[eachPropName] = new CharacterPropertyBattle({ character: this, property: eachProperty });
        }
        this.currHp = this.properties.hp.battleValue;
        this.isAlive = true;
        this.isSilence = false;
        this.isStunned = false;
        this.baseBattleEventSubscribers = {};
        this.statuses = [];
    }

    setBattle(battle: BattleBattle): void {
        this.battle = battle;
        this.subscribeBaseBattleEvent();
    }

    setFaction(faction: FactionBattle): void {
        this.faction = faction;
    }

    setTeam(team: TeamBattle): void {
        this.team = team;
    }

    /**订阅基本的战斗事件 */
    private subscribeBaseBattleEvent(): void {
        //攻击
        // const onAttacking: Subscriber = new Subscriber({
        //     event: TriggerTiming.Attacking,
        //     filter: this.uuid,
        //     priority: 2,
        //     callback: (source, data): boolean => {
        //         const target: CharacterBattle = data.target;
        //         console.log(`${this.name}向${target.name}发起了攻击`);
        //         this.battle!.eventCenter.trigger(
        //             new Event({ type: TriggerTiming.Attacked, source: target, data: { source: source } }),
        //         );
        //         return true;
        //     },
        // });
        const onAttacking = SubscriberFactory.Subscriber(
            TriggerTiming.Attacking,
            (source, data: EventDataAttacking) => {
                const target: CharacterBattle = data.target;
                console.log(`${this.name}向${target.name}发起了攻击`);
                this.battle!.eventCenter.trigger(
                    new Event({ type: TriggerTiming.Attacked, source: target, data: { source: this, target } }),
                );
                return true;
            },
            this,
            2,
        );
        this.battle!.eventCenter.addSubscriber(onAttacking);
        this.baseBattleEventSubscribers.onAttacking = onAttacking;

        //被攻击
        // const onAttacked: Subscriber = new Subscriber({
        //     event: TriggerTiming.Attacked,
        //     filter: this.uuid,
        //     priority: 2,
        //     callback: (source, data): boolean => {
        //         const attackSource: CharacterBattle = data.source;

        //         const damage = attackSource.properties.attack.battleValue;
        //         console.log(
        //             `${this.name}受到了${attackSource.name}的${damage}攻击. HP:${this.currHp - damage}/${
        //                 this.properties.hp.battleValue
        //             }`,
        //         );
        //         this.currHp -= damage;
        //         if (this.currHp <= 0) {
        //             this.currHp = 0;
        //             this.battle!.eventCenter.trigger(
        //                 new Event({
        //                     type: TriggerTiming.Killed,
        //                     source: this,
        //                     data: { source: attackSource, target: this },
        //                 }),
        //             );
        //         }

        //         return true;
        //     },
        // });

        const onAttacked = SubscriberFactory.Subscriber(
            TriggerTiming.Attacked,
            (source, data) => {
                const attackSource: CharacterBattle = data.source;
                const target = data.target;
                const damage = attackSource.properties.attack.battleValue;
                console.log(
                    `${target.name}受到了${attackSource.name}的${damage}攻击. HP:${target.currHp - damage}/${
                        target.properties.hp.battleValue
                    }`,
                );
                target.currHp -= damage;
                if (target.currHp <= 0) {
                    target.currHp = 0;
                    target.battle!.eventCenter.trigger(
                        new Event({
                            type: TriggerTiming.Killed,
                            source: target,
                            data: { source: attackSource, target },
                        }),
                    );
                }
                return true;
            },
            this,
            2,
        );
        this.battle!.eventCenter.addSubscriber(onAttacked);
        this.baseBattleEventSubscribers.onAttacked = onAttacked;

        //击杀
        // const onKilling: Subscriber = new Subscriber({
        //     event: TriggerTiming.Killing,
        //     filter: this.uuid,
        //     priority: 2,
        //     callback: (source, data): boolean => {
        //         const target: CharacterBattle = data.target;
        //         console.log(`${this.name}击杀了${target.name}`);
        //         return true;
        //     },
        // });

        const onKilling: Subscriber = SubscriberFactory.Subscriber(
            TriggerTiming.Killing,
            (source, data): boolean => {
                const target = data.target;
                console.log(`${this.name}击杀了${target.name}`);
                return true;
            },
            this,
            2,
        );
        this.battle!.eventCenter.addSubscriber(onKilling);
        this.baseBattleEventSubscribers.onKilling = onKilling;

        //被击杀
        // const onKilled: Subscriber = new Subscriber({
        //     event: TriggerTiming.Killed,
        //     filter: this.uuid,
        //     priority: 2,
        //     callback: (source, data): boolean => {
        //         const killSource: CharacterBattle = data.source;
        //         console.log(`${this.name}被${killSource.name}击杀了`);
        //         this.isAlive = false;
        //         this.battle!.eventCenter.trigger(
        //             new Event({
        //                 type: TriggerTiming.Killing,
        //                 source: killSource,
        //                 data: { source: killSource, target: this },
        //             }),
        //         );
        //         while (this.statuses.length) {
        //             const eachStatus = this.statuses.pop()!;
        //             eachStatus.destroy();
        //         }
        //         this.unSubscribeBaseBattleEvent();
        //         return true;
        //     },
        // });

        const onKilled: Subscriber = SubscriberFactory.Subscriber(
            TriggerTiming.Killed,
            (source, data): boolean => {
                const killSource = data.source;
                console.log(`${this.name}被${killSource.name}击杀了`);
                this.isAlive = false;
                this.battle!.eventCenter.trigger(
                    new Event({
                        type: TriggerTiming.Killing,
                        source: killSource,
                        data: { source: killSource, target: this },
                    }),
                );
                while (this.statuses.length) {
                    const eachStatus = this.statuses.pop()!;
                    eachStatus.destroy();
                }
                this.unSubscribeBaseBattleEvent();
                return true;
            },
            this,
            2,
        );

        this.battle!.eventCenter.addSubscriber(onKilled);
        this.baseBattleEventSubscribers.onKilled = onKilled;
    }

    /**移除订阅基本的战斗事件 */
    private unSubscribeBaseBattleEvent(): void {
        for (const eachSubscriberKey in this.baseBattleEventSubscribers) {
            const eachSubscriber = this.baseBattleEventSubscribers[eachSubscriberKey];
            eventCenter.removeSubscriber(eachSubscriber);
        }
    }

    async action(): Promise<void> {
        console.log(`轮到${this.name}行动了`);
        const availableTargets = this.battle!.characters.filter((eachCharacter) => {
            return this.team !== eachCharacter.team && eachCharacter.isAlive;
        });
        const target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
        await this.battle!.eventCenter.trigger(
            new Event({ type: TriggerTiming.Attacking, source: this, data: { source: this, target } }),
        );
    }

    print(): void {
        const baseData: { [propName: string]: any } = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
        for (const key in this) {
            if (Object.hasOwnProperty.call(this, key)) {
                const element = this[key];
                if (['string', 'number', 'boolean', 'bigint'].indexOf(typeof element) !== -1) {
                    baseData[key] = element;
                }
            }
        }
        for (const key in this.properties) {
            const currProperty: { [propName: string]: number } = {};
            currProperty.baseValue = this.properties[key].baseValue;
            currProperty.increaseValue = this.properties[key].increaseValue;
            currProperty.normalValue = this.properties[key].normalValue;
            currProperty.extraPercent = this.properties[key].extraPercent;
            currProperty.extraValue = this.properties[key].extraValue;
            currProperty.battleValue = this.properties[key].battleValue;
            baseData[key] = currProperty;
        }
        console.table(baseData);
    }
}
