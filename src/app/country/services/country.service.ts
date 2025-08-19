import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../types/rest-countries.type';
import { map } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLocaleLowerCase();

    return this.http
      .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map((restCountries) =>
          CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
        )
      );
  }
}
