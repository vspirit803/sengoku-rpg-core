/**
 * 条件项
 */
export class ConditionItem<T> {
  testInstence?: T;
  testFunction: (testInstence: T) => boolean;
  description: string;
  constructor({
    testInstence,
    testFunction,
    description,
  }: {
    testInstence?: T;
    testFunction: (testInstence: T) => boolean;
    description: string;
  }) {
    this.testInstence = testInstence;
    this.testFunction = testFunction;
    this.description = description;
  }

  setTestInstence(testInstence: T): void {
    this.testInstence = testInstence;
  }

  getFormatedDescription(indentation = 0): string {
    return (this.isCompleted ? '√ ' : '').padStart(4 * indentation - 2) + this.description;
  }

  get isCompleted(): boolean {
    if (this.testInstence === undefined) {
      throw new Error('未设定实例就尝试获取条件状态');
    }
    return this.testFunction(this.testInstence);
  }
}
