import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本句子-条件指令
 */

export class ScenarioSentenceCondition extends ScenarioSentenceBase {
    ifTargetId: string; //满足条件时的跳转目标
    elseTargetId: string; //不满足条件时的跳转目标
    constructor() {
        super();
        this.type = 'condition';
        this.ifTargetId = '';
        this.elseTargetId = '';
    }
}
