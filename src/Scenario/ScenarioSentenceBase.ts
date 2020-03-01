/**
 * 剧本句子的基类
 */
import { Scenario } from './Scenario';
export abstract class ScenarioSentenceBase {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    action(scenario: Scenario): void {
        // eslint-disable-line @typescript-eslint/no-unused-vars
        /**
         * todo
         */
    }

    constructor() {
        this.type = '';
    }
}
