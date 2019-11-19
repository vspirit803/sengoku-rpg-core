import { eventCenter } from '../../src/EventCenter/EventCenter';
import { Subscriber } from '../../src/EventCenter/Subscriber';
import { Event } from '../../src/EventCenter/Event';

const subscriber1 = new Subscriber({
    event: 'attacked',
    callback: (uuid, data) => {
        console.log('callback1');
        data.set('callback1', true);
        data.set('countCallback', data.get('countCallback') + 1);
        return true;
    },
});
const subscriber2 = new Subscriber({
    event: 'treated',
    callback: (uuid, data) => {
        console.log('callback2');
        data.set('callback2', true);
        data.set('countCallback', data.get('countCallback') + 1);
        return true;
    },
});
const subscriber3 = new Subscriber({
    event: 'attacked',
    priority: 1,
    callback: (uuid, data) => {
        console.log('callback3');
        data.set('callback3', true);
        data.set('countCallback', data.get('countCallback') + 1);
        return true;
    },
});

async function test(): Promise<void> {
    eventCenter.addSubscriber(subscriber1);
    eventCenter.addSubscriber(subscriber2);
    eventCenter.addSubscriber(subscriber3);

    const data = new Map<string, any>();
    data.set('countCallback', 0);
    await eventCenter.trigger(new Event({ type: 'treated', source: { uuid: Symbol('character1') }, data }));
    await eventCenter.trigger(new Event({ type: 'attacked', source: { uuid: Symbol('character2') }, data }));

    console.log(data);
    for (const iterator of data) {
        console.log(`data[${iterator[0]}]=${iterator[1]}`);
    }
}
test();
