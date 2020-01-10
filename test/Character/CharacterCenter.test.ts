import { CharacterCenter } from '@/Character/CharacterCenter';
test('test', () => {
    const characterCenter = new CharacterCenter();
    // console.log(characterCenter.characters[0].properties?.atk.normalValue);
    expect(characterCenter.charactersConfiguration.length).toEqual(13);
});
