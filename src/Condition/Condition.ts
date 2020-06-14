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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  conditionItems: Array<ConditionItem<any> | Condition>;

  constructor({
    logicOperator = LogicOperator.And,
    conditionItems = [],
  }: {
    logicOperator?: LogicOperator;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    conditionItems?: Array<ConditionItem<any> | Condition>;
  } = {}) {
    this.logicOperator = logicOperator;
    this.conditionItems = conditionItems;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addConditionItem(...items: Array<ConditionItem<any> | Condition>): void {
    this.conditionItems.push(...items);
  }

  getFormatedDescription(indentation = 0): string {
    const innterStr = `  ${this.logicOperator === LogicOperator.And ? '且' : '或'}\n`;
    return this.conditionItems
      .map((eachConditionItem) => eachConditionItem.getFormatedDescription(indentation + 1))
      .join(innterStr);
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
