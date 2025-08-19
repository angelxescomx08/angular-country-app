import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../types/rest-countries.type';
import { catchError, delay, map, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../types/country.type';
import { Region } from '../types/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string,Country[]>()
  private queryCacheCountry = new Map<string,Country[]>()
  private queryCacheRegion = new Map<Region,Country[]>()

  searchByCapital(query: string) {
    query = query.toLocaleLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query));
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap(countries => this.queryCacheCapital.set(query,countries)),
      catchError((error) => {
        return throwError(
          () => new Error('No se pudo obtener países con esa query')
        );
      })
    );
  }

  searchByCountry(query: string) {
    query = query.toLocaleLowerCase();

    if(this.queryCacheCountry.has(query)){
      return of(this.queryCacheCountry.get(query));
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap(countries => this.queryCacheCountry.set(query, countries)),
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

  searchByRegion(region: Region) {
    if(this.queryCacheRegion.has(region)){
      return of(this.queryCacheRegion.get(region));
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((restCountries) =>
        CountryMapper.mapRestCountryArrayToCountryArray(restCountries)
      ),
      tap(countries => this.queryCacheRegion.set(region, countries)),
      // delay(3000),
      catchError((error) => {
        return throwError(
          () => new Error('No se pudo obtener países con esa query')
        );
      })
    );
  }
}
