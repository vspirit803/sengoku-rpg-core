import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本句子-选择
 */

export class ScenarioSentenceSelect extends ScenarioSentenceBase {
    name: string;
    options: Array<ScenarioSentenceSelectOption>;
    constructor() {
        super();
        this.name = '';
        this.type = 'system';
        this.options = new Array<ScenarioSentenceSelectOption>(0);
    }
}

/**
 * 剧本句子-选择-选项
 */
class ScenarioSentenceSelectOption {
    name: string;
    text: string;
    constructor() {
        this.name = 'option';
        this.text = '选项';
    }
}
