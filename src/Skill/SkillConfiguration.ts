export interface SkillConfiguration {
  /**技能id */
  id: string;
  /**技能名称 */
  name: string;
  /**技能类型 */
  type: string;
  /**技能等级数据 */
  levels: Array<{ [propName: string]: number }>;
  /**技能描述 */
  description: string;
  /**技能消耗 */
  cost: number;
  /**技能效果 */
  effects?: Array<unknown>;
}
