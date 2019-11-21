import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyBattle } from './CharacterPropertyBattle';
import { TeamBattle } from '../Team/TeamBattle';
import { FactionBattle } from '../Faction/FactionBattle';
import { BattleBattle } from '../Battle/BattleBattle';
import { Subscriber } from '../EventCenter/Subscriber';
import { eventCenter } from '../EventCenter/EventCenter';

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
    isAlive: boolean; //是否存活
    isSilence: boolean; //是否被沉默
    isStunned: boolean; //是否被眩晕
    baseBattleEventSubscribers: { [eventName: string]: Subscriber };

    constructor({ character = new CharacterNormal() }: { character?: CharacterNormal } = {}) {
        super({ character, level: character.level });
        this.uuid = Symbol('CharacterBattle');
        this.properties = {};
        for (const eachPropName in character.properties) {
            const eachProperty = character.properties[eachPropName];
            this.properties[eachPropName] = new CharacterPropertyBattle({ character: this, property: eachProperty });
        }
        this.isAlive = true;
        this.isSilence = false;
        this.isStunned = false;
        this.baseBattleEventSubscribers = {};
        this.subscribeBaseBattleEvent();
    }

    /**订阅基本的战斗事件 */
    private subscribeBaseBattleEvent(): void {
        //攻击
        const onAttacking: Subscriber = new Subscriber({
            event: 'attacking',
            filter: this.uuid,
            priority: 2,
            callback: (source, data): boolean => {
                console.log(`${this.name}发起了攻击`);
                return true;
            },
        });
        eventCenter.addSubscriber(onAttacking);
        this.baseBattleEventSubscribers.onAttacking = onAttacking;

        //被攻击
        const onAttacked: Subscriber = new Subscriber({
            event: 'attacked',
            filter: this.uuid,
            priority: 2,
            callback: (source, data): boolean => {
                console.log(`${this.name}受到了攻击`);
                return true;
            },
        });
        eventCenter.addSubscriber(onAttacked);
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
        eventCenter.addSubscriber(onKilling);
        this.baseBattleEventSubscribers.onKilling = onKilling;

        //被击杀
        const onKilled: Subscriber = new Subscriber({
            event: 'killed',
            filter: this.uuid,
            priority: 2,
            callback: (source, data): boolean => {
                console.log(`${this.name}受到了击杀`);
                this.isAlive = false;
                return true;
            },
        });
        eventCenter.addSubscriber(onKilled);
        this.baseBattleEventSubscribers.onKilled = onKilled;
    }

    /**移除订阅基本的战斗事件 */
    private unSubscribeBaseBattleEvent(): void {
        for (const eachSubscriberKey in this.baseBattleEventSubscribers) {
            const eachSubscriber = this.baseBattleEventSubscribers[eachSubscriberKey];
            eventCenter.removeSubscriber(eachSubscriber);
        }
    }
}
