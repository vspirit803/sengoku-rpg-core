import { BattleBattle } from '@src/Battle';
import { UUID } from '@src/Common';
import { Event, EventData, Subscriber, SubscriberFactory, TriggerTiming } from '@src/EventCenter';
import { EventDataSkillSelect } from '@src/EventCenter/EventData';
import { FactionBattle } from '@src/Faction';
import { Skill } from '@src/Skill';
import { skillStore } from '@src/Skill/Skills';
import { Status } from '@src/Status';
import { TeamBattle } from '@src/Team';

import { CharacterNormal } from './CharacterNormal';
import { CharacterPropertyBattle } from './CharacterPropertyBattle';

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

  /**是否玩家操控角色 */
  get isPlayerControl(): boolean {
    return this.faction === this.battle?.factions[0];
  }

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
  subscribeBaseBattleEvent(): void {
    //攻击
    const onAttacking = SubscriberFactory.Subscriber({
      event: TriggerTiming.Attacking,
      callback: (source, data: EventData.EventDataAttacking) => {
        const target: CharacterBattle = data.target;
        console.log(`[${this.name}]🗡️[${target.name}]`);
        this.battle!.eventCenter.trigger(
          new Event({ type: TriggerTiming.Attacked, source: target, data: { source: this, target } }),
        );
        return true;
      },
      filter: this,
      priority: 2,
    });
    this.battle!.eventCenter.addSubscriber(onAttacking);
    this.baseBattleEventSubscribers.onAttacking = onAttacking;

    //受到攻击
    const onAttacked = SubscriberFactory.Subscriber({
      event: TriggerTiming.Attacked,
      callback: (source, data) => {
        const attackSource: CharacterBattle = data.source;
        const target = data.target;
        const damage = Math.round(attackSource.properties.atk.battleValue) - target.properties.def.battleValue;
        const newHp = target.currHp > damage ? target.currHp - damage : 0;
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
      filter: this,
      priority: 2,
    });

    this.battle!.eventCenter.addSubscriber(onAttacked);
    this.baseBattleEventSubscribers.onAttacked = onAttacked;

    /**造成伤害 */
    const onDamaging = SubscriberFactory.Subscriber({
      event: TriggerTiming.Damaging,
      callback: async (_, data) => {
        const target = data.target;
        await this.battle!.eventCenter.trigger(
          new Event({
            type: TriggerTiming.Damaged,
            source: target,
            data,
          }),
        );
        await this.battle!.eventCenter.trigger(
          new Event({
            type: TriggerTiming.AfterDamaging,
            source: this,
            data,
          }),
        );
        return true;
      },
      filter: this,
      priority: 2,
    });
    this.battle!.eventCenter.addSubscriber(onDamaging);
    this.baseBattleEventSubscribers.onDamaging = onDamaging;

    /**受到伤害 */
    const onDamaged = SubscriberFactory.Subscriber({
      event: TriggerTiming.Damaged,
      callback: (_, data) => {
        const source: CharacterBattle = data.source;
        const target = data.target;
        const damage = data.damage;
        /**计算减伤和保底后的伤害 */
        const finalDamage = Math.round(
          Math.max(0.1 * source.properties.atk.battleValue, damage - target.properties.def.battleValue),
        );
        const actualDamage = Math.min(target.currHp, finalDamage); //真正造成的伤害
        const overflowDamage = finalDamage - actualDamage; //溢出伤害
        const newHp = target.currHp - actualDamage;
        console.log(`[${target.name}]💔${actualDamage} -> ${newHp}/${target.properties.hp.battleValue}`);
        data.actualDamage = actualDamage;
        data.overflowDamage = overflowDamage;
        target.currHp = newHp;
        if (target.currHp <= 0) {
          target.currHp = 0;
          target.battle!.eventCenter.trigger(
            new Event({
              type: TriggerTiming.Killed,
              source: target,
              data,
            }),
          );
        }
        return true;
      },
      filter: this,
      priority: 2,
    });
    this.battle!.eventCenter.addSubscriber(onDamaged);
    this.baseBattleEventSubscribers.onDamaged = onDamaged;

    /**造成击杀 */
    const onKilling: Subscriber = SubscriberFactory.Subscriber({
      event: TriggerTiming.Killing,
      callback: (source, data): boolean => {
        const target = data.target;
        console.log(`[${this.name}]🗡️☠[${target.name}]`);
        return true;
      },
      filter: this,
      priority: 2,
    });
    this.battle!.eventCenter.addSubscriber(onKilling);
    this.baseBattleEventSubscribers.onKilling = onKilling;

    /**受到击杀 */
    const onKilled: Subscriber = SubscriberFactory.Subscriber({
      event: TriggerTiming.Killed,
      callback: (source, data): boolean => {
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
      filter: this,
      priority: 2,
    });

    this.battle!.eventCenter.addSubscriber(onKilled);
    this.baseBattleEventSubscribers.onKilled = onKilled;
  }

  /**移除订阅基本的战斗事件 */
  unSubscribeBaseBattleEvent(): void {
    for (const eachSubscriberKey in this.baseBattleEventSubscribers) {
      const eachSubscriber = this.baseBattleEventSubscribers[eachSubscriberKey];
      this.battle!.eventCenter.removeSubscriber(eachSubscriber);
    }
  }

  async action(): Promise<void> {
    const availableTargets = this.enemies.filter((eachCharacter) => eachCharacter.isAlive);
    let target = availableTargets[Math.floor(Math.random() * availableTargets.length)];
    let skill = this.skills[0];

    if (this.isPlayerControl && this.battle!.fireTarget) {
      target = this.battle!.fireTarget;
    }

    if (!this.battle!.autoMode && this.isPlayerControl) {
      const skillSelectData: EventDataSkillSelect = {
        source: this,
        selectedSkill: undefined,
        selectedTarget: undefined,
      };
      await this.battle!.eventCenter.trigger(
        new Event({
          type: TriggerTiming.SkillSelect,
          source: this,
          data: skillSelectData,
        }),
      );
      const { selectedSkill, selectedTarget } = skillSelectData;
      target = selectedTarget ?? target;
      skill = selectedSkill ?? skill;
    }

    await skillStore[skill.id](skill, this, target);

    await this.battle!.eventCenter.trigger(
      new Event({ type: TriggerTiming.ActionEnd, source: this, data: { source: this } }),
    );
  }

  get enemies(): Array<CharacterBattle> {
    if (!this.battle) {
      throw new Error('[CharacterBattle] get enemies before setting battle');
    }
    return this.battle.characters.filter((eachCharacter) => eachCharacter.faction !== this.faction);
  }
}
