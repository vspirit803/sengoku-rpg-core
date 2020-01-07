/**
 * 条件项
 */
export class ConditionItem {
    completedFlag: boolean;
    constructor({ completedFlag = true }: { completedFlag?: boolean } = {}) {
        this.completedFlag = completedFlag;
    }

    //是否完成
    get isCompleted(): boolean {
        return this.completedFlag;
    }
}
