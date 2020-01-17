import { MapConfiguration } from './MapConfiguration';
import { Game } from '@/Game';
import { GameMap } from './Map';
import { City } from './City';
import { CityConfiguration } from './CityConfiguration';
import { Province } from './Province';
import { ProvinceConfiguration } from './ProvinceConfiguration';
import { District } from './District';
import maps from '@assets/configurations/maps.json';
import cities from '@assets/configurations/cities.json';
import provinces from '@assets/configurations/provinces.json';
import { MapSave } from './MapSave';

export class MapCenter {
    /**绑定的游戏实例 */
    private game?: Game;
    /**地图配置映射 */
    mapsConfigurationMap: Map<string, MapConfiguration>;
    /**读图id到地图实例的映射 */
    mapsMap: Map<string, GameMap>;

    citiesMap: Map<string, City>;
    citiesConfigurationMap: Map<string, CityConfiguration>;
    provincesMap: Map<string, Province>;
    provincesConfigurationMap: Map<string, ProvinceConfiguration>;

    constructor() {
        this.mapsConfigurationMap = new Map<string, MapConfiguration>();
        this.mapsMap = new Map<string, GameMap>();
        this.citiesMap = new Map<string, City>();
        this.citiesConfigurationMap = new Map<string, CityConfiguration>();
        this.provincesMap = new Map<string, Province>();
        this.provincesConfigurationMap = new Map<string, ProvinceConfiguration>();
    }

    loadCitiesConfiguration(cities: Array<CityConfiguration>): void {
        for (const eachCity of cities) {
            this.citiesConfigurationMap.set(eachCity.id, eachCity);
        }
    }

    loadProvincesConfiguration(provinces: Array<ProvinceConfiguration>): void {
        for (const eachProvince of provinces) {
            this.provincesConfigurationMap.set(eachProvince.id, eachProvince);
        }
    }

    loadMapsConfiguration(maps: Array<MapConfiguration>): void {
        for (const eachMap of maps) {
            this.mapsConfigurationMap.set(eachMap.id, eachMap);
        }
    }

    getCity(id: string): City {
        let city = this.citiesMap.get(id);
        if (city) {
            return city;
        }
        const configuration = this.citiesConfigurationMap.get(id);
        if (!configuration) {
            throw Error(`id为[${id}]的城市配置不存在`);
        }
        city = new City(configuration);
        this.citiesMap.set(id, city);
        return city;
    }

    getProvince(id: string): Province {
        let province = this.provincesMap.get(id);
        if (province) {
            return province;
        }
        const configuration = this.provincesConfigurationMap.get(id);
        if (!configuration) {
            throw Error(`id为[${id}]的令制国配置不存在`);
        }
        province = new Province({
            ...configuration,
            district: (District as { [districtName: string]: string })[configuration.district] as District,
            cities: configuration.cities.map((eachCityId) => this.getCity(eachCityId)),
        });
        this.provincesMap.set(id, province);
        return province;
    }

    getMap(id: string): GameMap {
        let map = this.mapsMap.get(id);
        if (map) {
            return map;
        }
        const configuration = this.mapsConfigurationMap.get(id);
        if (!configuration) {
            throw Error(`id为[${id}]的地图配置不存在`);
        }
        map = new GameMap({
            ...configuration,
            provinces: configuration.provinces.map((eachProvinceId) => this.getProvince(eachProvinceId)),
        });
        return map;
    }

    loadSave(data: MapSave): void {
        for (const eachCitySave of data.cities) {
            const city = this.getCity(eachCitySave.id);
            city.loadSave(eachCitySave);
        }
    }
}

const mapCenter = new MapCenter();
mapCenter.loadCitiesConfiguration(cities);
mapCenter.loadProvincesConfiguration(provinces);
mapCenter.loadMapsConfiguration(maps);
const japan = mapCenter.getMap('japan');
