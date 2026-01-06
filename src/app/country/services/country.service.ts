import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountryResponse } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = `https://restcountries.com/v3.1`;

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient); // defino la inyección de HttpClient

  searchByCapital(query: string) {
    query = query.toLowerCase();

    return this.http.get<RESTCountryResponse[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        throw error;
      })
    );
  }

  searchByCountry(query: string){
    const url = `${API_URL}/name/${query}`;
    query = query.toLowerCase();

    return this.http.get<RESTCountryResponse[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      delay(2000),
      catchError((error) => {
        console.log('Error fetching ', error);
        return throwError(
          () => new Error('Error searching country by name')
        )
      })
    );
  }

 searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`;

    return this.http.get<RESTCountryResponse[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese código ${code}`)
        );
      })
    );
  }
}
