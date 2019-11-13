import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本
 */

export class Scenario {
    sentences: Array<ScenarioSentenceBase>;
    index: number;
    nextIndex: number;
    onComplete: Function;
    onEnter: Function;
    data: { [propName: string]: number | string | boolean };
    constructor({ onComplete, onEnter }: { onComplete: Function; onEnter: Function }) {
        this.sentences = new Array<ScenarioSentenceBase>(0);
        this.index = 0;
        this.nextIndex = 1;
        this.onComplete = onComplete;
        this.onEnter = onEnter;
        this.data = {};
    }

    next(): void {
        if (this.nextIndex >= this.sentences.length) {
            this.onComplete(this.data);
            return;
        }
        this.index = this.nextIndex;
        this.onEnter(this, this.sentences[this.index]);
        // this.sentences[this.index].action(this);
    }
}
