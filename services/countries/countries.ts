import { CountryCode } from 'libphonenumber-js';
import getCountries from './getCountries';

const COUNTRIES = getCountries();

const getCountryTelCode = (country: CountryCode | string) =>
    country && COUNTRIES.find(({ iso2 }) => iso2 === country)?.prefix;

export { COUNTRIES, getCountryTelCode };
