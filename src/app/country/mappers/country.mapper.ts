import { Country } from '../types/country.type';
import { RESTCountry } from '../types/rest-countries.type';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry) {
    const country: Country = {
      capital: restCountry.capital.join(","),
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      population: restCountry.population,
    };

    return country;
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]) {
    console.log(restCountries)
    return restCountries.map((restCountry) =>
      this.mapRestCountryToCountry(restCountry)
    );
  }
}
