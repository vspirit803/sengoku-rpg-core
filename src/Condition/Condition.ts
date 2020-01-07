import { ConditionItem } from './ConditionItem';

/**
 * 逻辑操作符,与/或
 */
export enum LogicOperator {
    And, //与
    Or, //或
}

/**
 * 条件类
 */
export class Condition {
    /**各个条件项的关系 */
    logicOperator: LogicOperator;
    conditionItems: Array<ConditionItem | Condition>;

    constructor({
        logicOperator = LogicOperator.And,
        conditionItems = [],
    }: {
        logicOperator?: LogicOperator;
        conditionItems?: Array<ConditionItem | Condition>;
    } = {}) {
        this.logicOperator = logicOperator;
        this.conditionItems = conditionItems;
    }

    addConditionItem(...items: Array<ConditionItem | Condition>): void {
        this.conditionItems.push(...items);
    }

    //是否完成
    get isCompleted(): boolean {
        if (this.logicOperator === LogicOperator.And) {
            //与的关系
            return this.conditionItems.every((eachConditionItem) => eachConditionItem.isCompleted);
        } else {
            //或的关系
            return this.conditionItems.some((eachConditionItem) => eachConditionItem.isCompleted);
        }
    }
}
