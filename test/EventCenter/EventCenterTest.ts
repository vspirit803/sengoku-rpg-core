import { eventCenter } from '../../src/EventCenter/EventCenter';
import { Subscriber } from '../../src/EventCenter/Subscriber';
import { Event } from '../../src/EventCenter/Event';

const subscriber1 = new Subscriber({
    event: 'attacked',
    callback: (uuid, data) => {
        console.log('callback1');
        data.callback1 = true;
        data.countCallback++;
        return true;
    },
});
const subscriber2 = new Subscriber({
    event: 'treated',
    callback: (uuid, data) => {
        console.log('callback2');
        data.callback2 = true;
        data.countCallback++;
        return true;
    },
});
const subscriber3 = new Subscriber({
    event: 'attacked',
    priority: 1,
    callback: (uuid, data) => {
        console.log('callback3');
        data.callback3 = true;
        data.countCallback++;
        return true;
    },
});

async function test(): Promise<void> {
    eventCenter.addSubscriber(subscriber1);
    eventCenter.addSubscriber(subscriber2);
    eventCenter.addSubscriber(subscriber3);

    const data: { [propName: string]: any } = {};
    data.countCallback = 0;
    await eventCenter.trigger(new Event({ type: 'treated', source: { uuid: Symbol('character1') }, data }));
    await eventCenter.trigger(new Event({ type: 'attacked', source: { uuid: Symbol('character2') }, data }));

    console.log(data);
}
test();
