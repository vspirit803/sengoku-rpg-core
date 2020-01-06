/**任务状态 */
export enum TaskStatus {
    Untouchable, //没满足条件
    Ready, //满足条件但还没接
    Ongoing, //进行中
    Completed, //已完成但还未交
    Finished, //已交任务
    Failed, //任务已失败
}
