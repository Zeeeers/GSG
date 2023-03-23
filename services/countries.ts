//@ts-nocheck
import sc from 'states-cities-db';

const COUNTRIES = sc.getCountries();

const getCountryTelCode = (country) => country && COUNTRIES.find(({ iso2 }) => iso2 === country)?.prefix;

export { COUNTRIES, getCountryTelCode };
