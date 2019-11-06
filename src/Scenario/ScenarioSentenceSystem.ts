import { ScenarioSentenceBase } from './ScenarioSentenceBase';

/**
 * 剧本句子-系统指令
 */

export class ScenarioSentenceSystem extends ScenarioSentenceBase {
    characterIds: Array<string>; //出现立绘的角色id
    bgm: string;
    background: string;
    cg: string;
    constructor() {
        super();
        this.type = 'system';
        this.characterIds = new Array<string>(0);
        this.bgm = '';
        this.background = '';
        this.cg = '';
    }
}
