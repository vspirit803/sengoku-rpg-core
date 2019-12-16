import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本句子-对话
 */

export class ScenarioSentenceConversation extends ScenarioSentenceBase {
    characterName: string;
    text: string;
    background: string;
    constructor({ type = 'conversation', characterName = '李白', text = '天生我材必有用', background = '' } = {}) {
        super();
        this.type = type;
        this.characterName = characterName;
        this.text = text;
        this.background = background;
    }
}
