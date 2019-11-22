import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyBattle } from './CharacterPropertyBattle';
import { TeamBattle } from '../Team/TeamBattle';
import { FactionBattle } from '../Faction/FactionBattle';
import { BattleBattle } from '../Battle/BattleBattle';
import { Subscriber } from '../EventCenter/Subscriber';
import { eventCenter } from '../EventCenter/EventCenter';
import { Event } from '../EventCenter/Event';

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
        const onAttacking: Subscriber = new Subscriber({
            event: 'attacking',
            filter: this.uuid,
            priority: 2,
            callback: (source, data): boolean => {
                const target: CharacterBattle = data.target;
                console.log(`${this.name}向${target.name}发起了攻击`);
                this.battle!.eventCenter.trigger(
                    new Event({ type: 'attacked', source: target, data: { source: source } }),
                );
                return true;
            },
        });
        this.battle!.eventCenter.addSubscriber(onAttacking);
        this.baseBattleEventSubscribers.onAttacking = onAttacking;

        //被攻击
        const onAttacked: Subscriber = new Subscriber({
            event: 'attacked',
            filter: this.uuid,
            priority: 2,
            callback: (source, data): boolean => {
                const attackSource: CharacterBattle = data.source;

                const damage = attackSource.properties.attack.battleValue;
                console.log(
                    `${this.name}受到了${attackSource.name}的${damage}攻击. HP:${this.currHp - damage}/${
                        this.properties.hp.battleValue
                    }`,
                );
                this.currHp -= damage;
                if (this.currHp <= 0) {
                    this.currHp = 0;
                    this.battle!.eventCenter.trigger(
                        new Event({ type: 'killed', source: this, data: { source: attackSource, target: this } }),
                    );
                }

                return true;
            },
        });
        this.battle!.eventCenter.addSubscriber(onAttacked);
        this.baseBattleEventSubscribers.onAttacked = onAttacked;

        //击杀
        const onKilling: Subscriber = new Subscriber({
            event: 'killing',
            filter: this.uuid,
            priority: 2,
            callback: (source, data): boolean => {
                console.log(`${this.name}造成了击杀`);
                return true;
            },
        });
        this.battle!.eventCenter.addSubscriber(onKilling);
        this.baseBattleEventSubscribers.onKilling = onKilling;

        //被击杀
        const onKilled: Subscriber = new Subscriber({
            event: 'killed',
            filter: this.uuid,
            priority: 2,
            callback: (source, data): boolean => {
                console.log(`${this.name}受到了击杀`);
                this.isAlive = false;
                this.battle!.eventCenter.trigger(
                    new Event({ type: 'killing', source: this, data: { source: data.source, target: this } }),
                );
                return true;
            },
        });
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
        await this.battle!.eventCenter.trigger(new Event({ type: 'attacking', source: this, data: { target } }));
    }

    print(): void {
        const baseData: { [propName: string]: any } = {};
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
