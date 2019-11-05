import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本句子-对话
 */

export class ScenarioSentenceConversation extends ScenarioSentenceBase {
    constructor() {
        super();
        this.type = 'conversation';
    }
}
