import { TaskStatus } from './TaskStatus';

/**任务 */
export class Task {
    /**任务状态 */
    taskStatus: TaskStatus;
    /**任务描述 */
    description: string;

    constructor({ description }: { description: string }) {
        this.taskStatus = TaskStatus.Untouchable;
        this.description = description;
    }
}
