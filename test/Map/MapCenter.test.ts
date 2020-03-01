import { MapCenter } from '@src/Map';

import maps from '@assets/data/maps.json';
import cities from '@assets/data/cities.json';
import provinces from '@assets/data/provinces.json';
import save from '@assets/saves/sav001.json';

const mapCenter = new MapCenter();
mapCenter.loadCitiesConfiguration(cities);
mapCenter.loadProvincesConfiguration(provinces);
mapCenter.loadMapsConfiguration(maps);
mapCenter.loadSave(save.maps);
const japan = mapCenter.getMap('japan');
test('MapCenter', () => {
    expect(japan.id).toBe('japan');
    expect(japan.name).toBe('东瀛');
});
