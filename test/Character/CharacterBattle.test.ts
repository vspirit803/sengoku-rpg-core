import { CharacterBattle } from '../../src/Character/CharacterBattle';
import { eventCenter } from '../../src/EventCenter/EventCenter';
const characterA = new CharacterBattle();

console.log(characterA);
// console.log(eventCenter.subscribers);
// eventCenter.subscribers.forEach((eachSubscriber) => {
//     console.log(eachSubscriber.event);
//     console.log(eachSubscriber.filter);
//     console.log(eachSubscriber.priority);
// });

for (const eachSubscriber of eventCenter.subscribers) {
    console.log(eachSubscriber.event);
    console.log(eachSubscriber.filter);
    console.log(eachSubscriber.priority);
}
