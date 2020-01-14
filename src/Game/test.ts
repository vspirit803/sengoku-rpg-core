import { Game } from './Game';
import save001 from '@assets/saves/sav001.json';

console.time('载入游戏配置');
const game = new Game();
console.timeEnd('载入游戏配置');
console.time('载入游戏存档');
game.loadSave(save001);
console.timeEnd('载入游戏存档');
// console.log(game.characterCenter.characters);

const battle = game.battleCenter.generateBattle('Battle00001');
battle.start();

// console.log('end');
