import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURL = 'https://restcountries.com/v3.1/'
  constructor(private httpClient: HttpClient) { }

  private getRequest<T>(url: string) {
    return this.httpClient.get<T>(url)
      .pipe(
        catchError(() => of([]))
      )
  }

  searchCapitalByName(searchTerm: string): Observable<Country[]> {
    return this.getRequest<Country[]>(`${this.apiURL}capital/${searchTerm}`)
  }

  searchCountryByName(searchTerm: string): Observable<Country[]> {
    return this.getRequest<Country[]>(`${this.apiURL}name/${searchTerm}`)
  }
  searchCountryByAlfaCode(alfaCode: string): Observable<Country | null> {
    return this.getRequest<Country[]>(`${this.apiURL}alpha/${alfaCode}`)
    .pipe(
      map(res => res.length > 0 ?  res[0]: null)
    )
  }

  searchRegionByName(searchTerm: string): Observable<Country[]> {
    return this.getRequest<Country[]>(`${this.apiURL}region/${searchTerm}`)
  }

}