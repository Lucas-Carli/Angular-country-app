import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountryResponse } from '../interfaces/rest-countries.interface';
import { catchError, map } from 'rxjs';
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
}
