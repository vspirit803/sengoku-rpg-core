import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本
 */

export class Scenario {
    sentences: Array<ScenarioSentenceBase>;
    index: number;
    onComplete: Function;
    data: { [propName: string]: number | string | boolean };
    constructor({ onComplete }: { onComplete: Function }) {
        this.sentences = new Array<ScenarioSentenceBase>(0);
        this.index = 0;
        this.onComplete = onComplete;
        this.data = {};
    }
}
