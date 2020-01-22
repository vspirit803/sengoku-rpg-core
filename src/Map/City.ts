import { CityConfiguration } from './CityConfiguration';
import { CitySave } from './CitySave';

/**
 * 城
 */
export class City implements CityConfiguration {
    id: string;
    name: string;
    owner?: string;
    constructor(configuration: CityConfiguration) {
        this.id = configuration.id;
        this.name = configuration.name;
    }

    loadSave(data: CitySave): void {
        this.name = data.name ?? this.name;
        this.owner = data.owner;
    }
}
