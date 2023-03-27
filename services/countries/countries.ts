import { CountryCode } from 'libphonenumber-js';
import getCountries from './getCountries';

// get list of countries
const COUNTRIES = getCountries();

// get prefix of country
const getCountryTelCode = (country: CountryCode | string) =>
    country && COUNTRIES.find(({ iso2 }) => iso2 === country)?.prefix;

export { COUNTRIES, getCountryTelCode };
