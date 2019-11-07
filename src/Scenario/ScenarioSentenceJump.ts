import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本句子-跳转指令
 */

export class ScenarioSentenceJump extends ScenarioSentenceBase {
    targetId: string;
    constructor() {
        super();
        this.type = 'jump';
        this.targetId = '';
    }
}
