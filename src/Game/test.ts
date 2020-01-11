import { Game } from './Game';
import save001 from '@assets/saves/sav001.json';
const game = new Game();
game.loadSave(save001);

console.log(game.characterCenter.characters);

// eslint-disable-next-line no-empty
while (true) {}
