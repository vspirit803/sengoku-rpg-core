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

    constructor() {
        super();
        this.uuid = Symbol('CharacterBattle');
        this.properties = {};
        this.isAlive = true;
        this.isSilence = false;
        this.isStunned = false;
        this.subscribeBaseBattleEvent();
    }

    /**订阅基本的战斗事件 */
    private subscribeBaseBattleEvent(): void {
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
    }
}
