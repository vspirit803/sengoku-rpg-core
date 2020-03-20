import { SkillConfiguration } from './SkillConfiguration';

export class Skill {
    /**技能id */
    id: string;
    /**技能名称 */
    name: string;
    /**技能数据 */
    data: { [propName: string]: number };
    /**技能描述 */
    description: string;
    /**技能等级 */
    level: number;
    constructor(skillConfigration: SkillConfiguration, level: number) {
        if (skillConfigration.data[level] === undefined) {
            throw new Error(`技能[${skillConfigration.id}-${skillConfigration.name}]没有level.${level}的数据`);
        }
        this.id = skillConfigration.id;
        this.name = skillConfigration.name;
        this.level = level;
        this.description = skillConfigration.description;
        this.data = skillConfigration.data[this.level];
    }
}
