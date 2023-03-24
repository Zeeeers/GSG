import countries from './countries.json';
import _ from 'lodash';
import { CountryCode } from 'libphonenumber-js';

interface Country {
    name: string;
    slug: string;
    iso: string;
    iso2: string | CountryCode;
    prefix: string;
    currency: string;
    region: string;
    subregion: string;
    latlng: number[];
}

function getCountries(name?: CountryCode): Country[] {
    if (!_.isEmpty(name)) {
        const country = _.filter(countries, function (country: Country) {
            return _.includes(_.toLower(country.name), _.toLower(name));
        });

        return country;
    }

    return countries;
}

export default getCountries;
