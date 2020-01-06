import { TaskStatus } from './TaskStatus';

/**任务项 */
export class TaskItem {
    /**任务状态 */
    taskStatus: TaskStatus;

    constructor() {
        this.taskStatus = TaskStatus.Untouchable;
    }
}
