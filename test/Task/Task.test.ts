import { Condition } from '@src/Condition';
import { Task } from '@src/Task';

test('test', () => {
    const precondition = new Condition();
    const task = new Task({ id: 'Task00001', description: '测试任务', precondition });
    expect(task.description).toEqual('测试任务');
});
