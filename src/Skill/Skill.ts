import { SkillConfiguration } from './SkillConfiguration';

export class Skill {
  /**技能id */
  id: string;
  /**技能名称 */
  name: string;
  /**技能数据 */
  data: { [propName: string]: number };
  /**技能类别 */
  type: string;
  /**技能描述 */
  description: string;
  /**技能等级 */
  level: number;
  constructor(skillConfigration: SkillConfiguration, level: number) {
    if (skillConfigration.levels[level - 1] === undefined) {
      throw new Error(`技能[${skillConfigration.id}-${skillConfigration.name}]没有level.${level}的数据`);
    }
    this.id = skillConfigration.id;
    this.name = skillConfigration.name;
    this.type = skillConfigration.type;
    this.level = level;
    this.description = skillConfigration.description;
    this.data = skillConfigration.levels[this.level - 1];
  }
}

export class SkillFactory {
  /**技能配置列表 */
  static skillsConfiguration: Array<SkillConfiguration> = [];
  /**技能配置映射 */
  static skillsConfigurationMap: Map<string, SkillConfiguration> = new Map<string, SkillConfiguration>();

  static loadConfiguration(skills: Array<SkillConfiguration>): void {
    for (const eachSkill of skills) {
      SkillFactory.skillsConfigurationMap.set(eachSkill.id, eachSkill);
      SkillFactory.skillsConfiguration.push(eachSkill);
    }
  }

  static getSkill(id: string, level = 1): Skill {
    const configuration = SkillFactory.skillsConfigurationMap.get(id);
    if (!configuration) {
      throw new Error(`未找到id为[${id}]的技能配置`);
    }
    return new Skill(configuration, level);
  }
}
