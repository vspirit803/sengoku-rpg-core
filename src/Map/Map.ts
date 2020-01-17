import { Province } from './Province';

export class GameMap {
    id: string;
    name: string;
    provinces: Array<Province>;
    constructor({ id, name, provinces }: { id: string; name: string; provinces: Array<Province> }) {
        this.id = id;
        this.name = name;
        this.provinces = provinces;
    }
    // constructor(configuration: MapConfiguration) {
    //     this.id = configuration.id;
    //     this.name = configuration.name;
    //     this.provinces = configuration.provinces.map(
    //         (eachProvinceConfiguration) => new Province(eachProvinceConfiguration),
    //     );
    // }
}
