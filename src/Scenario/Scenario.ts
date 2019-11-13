import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本
 */

export class Scenario {
    sentences: Array<ScenarioSentenceBase>;
    index: number;
    nextIndex: number;
    onComplete: Function;
    onAction: Function;
    data: { [propName: string]: number | string | boolean };
    constructor({ onComplete, onAction }: { onComplete: Function; onAction: Function }) {
        this.sentences = new Array<ScenarioSentenceBase>(0);
        this.index = 0;
        this.nextIndex = 1;
        this.onComplete = onComplete;
        this.onAction = onAction;
        this.data = {};
    }

    next(): void {
        if (this.nextIndex >= this.sentences.length) {
            this.onComplete(this.data);
            return;
        }
        this.index = this.nextIndex;
        this.onAction(this, this.sentences[this.index]);
        // this.sentences[this.index].action(this);
    }
}
