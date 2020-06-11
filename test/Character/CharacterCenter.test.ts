import characters from '@assets/data/characters.json';
import skills from '@assets/data/skills.json';
import { CharacterCenter } from '@src/Character';
import { SkillFactory } from '@src/Skill';

test('默认值', () => {
    const characterCenter = new CharacterCenter();
    expect(characterCenter.charactersConfiguration.length).toEqual(0);
});
test('读取角色配置', () => {
    SkillFactory.loadConfiguration(skills);
    const characterCenter = new CharacterCenter();
    characterCenter.loadConfiguration(characters);
    expect(characterCenter.charactersConfiguration).toEqual(characters);
});
