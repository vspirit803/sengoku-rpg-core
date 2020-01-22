import { City } from './City';
import { District } from './District';

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
}
