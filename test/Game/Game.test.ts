import { Game } from '@/Game';
import { EventData, SubscriberFactory, TriggerTiming } from '@/EventCenter';
import save001 from '@assets/saves/sav001.json';

console.time('载入游戏配置');
const game = new Game();
console.timeEnd('载入游戏配置');

console.time('载入游戏存档');
game.loadSave(save001);
console.timeEnd('载入游戏存档');

const battle = game.battleCenter.generateBattle('Battle00001');

battle.eventCenter.addSubscriber(
    SubscriberFactory.Subscriber(
        TriggerTiming.BattleStart,
        (source, data: EventData.EventDataBattleStart) => {
            const battle = data.battle;
            console.log(
                `[${battle.factions[0].name}]与[${battle.factions[1].name}]两个阵营的矛盾终于暴发了,被后世称为[${battle.name}]的战斗正式打响`,
            );
            console.log('胜利条件:');
            console.log(battle.successCondition.getFormatedDescription());
            return true;
        },
        undefined,
        2,
    ),
);

battle.eventCenter.addSubscriber(
    SubscriberFactory.Subscriber(
        TriggerTiming.BattleSuccess,
        (source, data: EventData.EventDataBattleSuccess) => {
            const battle = data.battle;
            console.log(
                `经过${data.round}回合的鏖战后,[${battle.factions[0].name}]终于取得了胜利`,
                `\n这场战斗中,击杀了敌军${data.killed.join(', ')}`,
            );
            return true;
        },
        undefined,
        2,
    ),
);

battle.start().then(() => {
    // console.timeEnd('战斗');
});

// console.log('end');
