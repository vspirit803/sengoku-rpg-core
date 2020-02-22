import { TaskStatus } from './TaskStatus';
import { Condition } from '@src/Condition';

/**任务 */
export class Task {
    /**任务id */
    id: string;
    /**任务状态 */
    taskStatus: TaskStatus;
    /**任务描述 */
    description: string;
    /**任务目标 */
    target: Condition;
    /**任务前置条件 */
    precondition: Condition;
    /**
     * 任务数据 用于导出可能被其余任务依赖的数据
     */
    data: Map<string, string | number>;

    constructor({
        id,
        taskStatus = TaskStatus.Untouchable,
        description = '任务描述',
        target = new Condition(),
        precondition = new Condition(),
    }: {
        id: string;
        taskStatus?: TaskStatus;
        description?: string;
        target?: Condition;
        precondition?: Condition;
    }) {
        this.id = id;
        this.taskStatus = taskStatus;
        this.description = description;
        this.target = target;
        this.precondition = precondition;
        this.data = new Map<string, string | number>();
    }
}
