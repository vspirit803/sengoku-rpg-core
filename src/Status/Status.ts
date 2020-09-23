import { CharacterBattle } from '@src/Character';

import { Buff } from './Buff';

/**能否驱散 */
enum Dispellable {
  NEVER, //无法驱散
  DEATH_DISPEL, //死亡驱散
  STRONG_DISPEL, //强驱散
  BASIC_DISPEL, //基础驱散
}

/**
 * 状态
 */
export class Status {
  /**状态的来源角色 */
  source: CharacterBattle;
  /**状态的目标角色 */
  target: CharacterBattle;
  /**持续时间 */
  duration: number | 'forever';
  /**可驱散性 */
  dispellable: Dispellable;
  /**子Buff数组 */
  buffs: Array<Buff>;
  constructor({
    source,
    target,
    duration = 'forever',
    dispellable = Dispellable.DEATH_DISPEL,
    buffs = [],
  }: {
    source: CharacterBattle;
    target: CharacterBattle;
    duration?: number | 'forever';
    dispellable?: Dispellable;
    buffs?: Array<Buff>;
  }) {
    this.source = source;
    this.target = target;
    this.duration = duration;
    this.dispellable = dispellable;
    this.buffs = buffs;
  }

  addBuffs(...buffs: Array<Buff>): void {
    this.buffs.push(...buffs);
  }

  destroy(): void {
    this.buffs.forEach((eachBuff) => eachBuff.destroy());
  }

  afterRound(): void {
    if (this.duration !== 'forever') {
      this.duration--;
      if (this.duration === 0) {
        // todo
        // buff到期
      }
    }
  }
}
