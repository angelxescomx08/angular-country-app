import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../types/rest-countries.type';
import { catchError, delay, map, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      catchError((error) => {
        return throwError(
          () => new Error('No se pudo obtener países con esa query')
        );
      })
    );
  }

  searchByCountry(query: string) {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      // delay(3000),
      catchError((error) => {
        return throwError(
          () => new Error('No se pudo obtener países con esa query')
        );
      })
    );
  }

  searchByAlphaCode(query: string) {
    query = query.toLocaleLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      map(countries => countries.at(0)),
      // delay(3000),
      catchError((error) => {
        return throwError(
          () => new Error('No se pudo obtener países con esa query')
        );
      })
    );
  }
}
