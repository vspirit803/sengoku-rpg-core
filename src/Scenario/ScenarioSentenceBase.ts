/**
 * 剧本句子的基类
 */
import { Scenario } from './Scenario';
export abstract class ScenarioSentenceBase {
    type: string;
    action(scenario: Scenario): void {
        /**
         * todo
         */
    }

    constructor() {
        this.type = '';
    }
}
