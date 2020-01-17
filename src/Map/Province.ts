import { City } from './City';
import { District } from './District';
import { ProvinceConfiguration } from './ProvinceConfiguration';

/**
 * 令制国
 */
export class Province {
    id: string;
    name: string;
    cities: Array<City>;
    district: District;
    constructor({ id, name, cities, district }: { id: string; name: string; cities: Array<City>; district: District }) {
        this.id = id;
        this.name = name;
        this.cities = cities;
        this.district = district;
    }
    // constructor(configuration: ProvinceConfiguration) {
    //     this.id = configuration.id;
    //     this.name = configuration.name;
    //     this.cities = configuration.cities.map((eachCityConfiguration) => new City(eachCityConfiguration));
    //     this.district = (District as { [districtName: string]: string })[configuration.district] as District;
    // }
}
