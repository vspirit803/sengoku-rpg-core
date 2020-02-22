import { Task } from './Task';
import { TaskStatus } from './TaskStatus';
import { Game } from '@src/Game';

/**任务中心 */
export class TaskCenter {
    /**任务列表 */
    private tasks: Array<Task>;

    /**任务id到任务的映射 */
    private taskMap: Map<string, Task>;

    /**绑定的游戏实例 */
    private game?: Game;

    constructor() {
        this.tasks = [];
        this.taskMap = new Map<string, Task>();
    }

    /**
     * 获取任务列表
     * @param filter 过滤器,为空则返回所有任务
     * @returns 匹配过滤器的任务
     */
    getTasks(filter?: TaskStatus): Array<Task> {
        if (!filter) {
            return this.tasks;
        } else {
            return this.tasks.filter((eachTask) => eachTask.taskStatus === filter);
        }
    }

    /**
     * 增加任务
     * @param tasks 要增加的任务
     */
    addTasks(...tasks: Array<Task>): void {
        this.tasks.push(...tasks);
        tasks.forEach((eachTask) => {
            this.taskMap.set(eachTask.id, eachTask);
        });
    }

    /**
     * 绑定游戏实例
     * @param game 要绑定的游戏实例
     */
    setGame(game: Game): void {
        this.game = game;
    }
}
