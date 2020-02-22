import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyBattle } from './CharacterPropertyBattle';
import { TeamBattle } from '@src/Team';
import { FactionBattle } from '@src/Faction';
import { BattleBattle } from '@src/Battle';
import { Event, Subscriber, TriggerTiming, SubscriberFactory, EventData } from '@src/EventCenter';
import { Status } from '@src/Status';
import { UUID } from '@src/Common';

/**
 * 角色类(战斗状态)
 */
export class CharacterBattle extends CharacterNormal implements UUID {
    // uuid: symbol;
    // id: string;
    // level: number;
    // name: string;
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

    constructor(character: CharacterNormal) {
        super(character);
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

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loadSave(): void {}

    setBattle(battle: BattleBattle): void {
        // this.unSubscribeBaseBattleEvent();
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
            (source, data: EventData.EventDataAttacking) => {
                const target: CharacterBattle = data.target;
                console.log(`[${this.name}]🗡️[${target.name}]`);
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

        const onAttacked = SubscriberFactory.Subscriber(
            TriggerTiming.Attacked,
            (source, data) => {
                const attackSource: CharacterBattle = data.source;
                const target = data.target;
                const damage = Math.round(attackSource.properties.atk.battleValue);
                const newHp = target.currHp > damage ? target.currHp - damage : 0;
                // console.log(
                //     `[${target.name}]    ${target.currHp}❤️ - ${damage}💔 -> ${newHp}/${target.properties.hp.battleValue}`,
                // );
                console.log(`[${target.name}]💔${damage} -> ${newHp}/${target.properties.hp.battleValue}`);
                target.currHp = newHp;
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

        const onKilling: Subscriber = SubscriberFactory.Subscriber(
            TriggerTiming.Killing,
            (source, data): boolean => {
                const target = data.target;
                console.log(`[${this.name}]🗡️☠[${target.name}]`);
                return true;
            },
            this,
            2,
        );
        this.battle!.eventCenter.addSubscriber(onKilling);
        this.baseBattleEventSubscribers.onKilling = onKilling;

        const onKilled: Subscriber = SubscriberFactory.Subscriber(
            TriggerTiming.Killed,
            (source, data): boolean => {
                const killSource = data.source;
                console.log(`[${this.name}]☠`);
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
            this.battle!.eventCenter.removeSubscriber(eachSubscriber);
        }
    }

    async action(): Promise<void> {
        console.log(`轮到${this.name}行动了`);
        // const availableTargets = this.battle!.characters.filter((eachCharacter) => {
        //     return this.faction !== eachCharacter.faction && eachCharacter.isAlive;
        // });
        const availableTargets = this.enemies.filter((eachCharacter) => eachCharacter.isAlive);
        const target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
        await this.battle!.eventCenter.trigger(
            new Event({ type: TriggerTiming.Attacking, source: this, data: { source: this, target } }),
        );
    }

    get enemies(): Array<CharacterBattle> {
        if (!this.battle) {
            throw new Error('[CharacterBattle] get enemies before setting battle');
        }
        return this.battle.characters.filter((eachCharacter) => eachCharacter.faction !== this.faction);
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
