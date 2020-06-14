/**
 * 技能效果
 */

export interface SkillEffectConfigurationBase {
  type: string;
}

/**buff */
export interface SkillEffectConfigurationBuff extends SkillEffectConfigurationBase {
  /**buff id */
  buffId: string;
  /**持续时间 */
  duration: number;
}

/**攻击 */
export interface SkillEffectConfigurationAttack extends SkillEffectConfigurationBase {
  /**目标 */
  target: string; //单体 or 全体
  /**攻击倍率 */
  atkRatio: number;
}

/**治疗 */
export interface SkillEffectConfigurationTreat extends SkillEffectConfigurationBase {
  /**目标 */
  target: string; //单体 or 全体
  /**治疗倍率 */
  treatRatio: number;
}
