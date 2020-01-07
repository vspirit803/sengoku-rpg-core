import { Task } from '@/Task/Task';
import { Condition } from '@/Condition';

test('test', () => {
    const precondition = new Condition();
    const task = new Task({ id: 'Task00001', description: '测试任务', precondition });
    expect(task.description).toEqual('测试任务');
});
