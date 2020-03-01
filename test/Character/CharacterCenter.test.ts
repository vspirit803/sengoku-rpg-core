import { CharacterCenter } from '@src/Character';
import characters from '@assets/data/characters.json';
test('默认值', () => {
    const characterCenter = new CharacterCenter();
    expect(characterCenter.charactersConfiguration.length).toEqual(0);
});
test('读取角色配置', () => {
    const characterCenter = new CharacterCenter();
    characterCenter.loadConfiguration(characters);
    expect(characterCenter.charactersConfiguration).toEqual(characters);
});
