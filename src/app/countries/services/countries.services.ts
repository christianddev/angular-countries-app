import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CacheStore, Country, Region } from '../interfaces';


const INITIAL_CACHE_VALUE = {
  byCapital: {
    searchTerm: "",
    countries: []
  },
  byCountry: {
    searchTerm: "",
    countries: []
  },
  byRegion: {
    searchTerm: "",
    countries: []
  },
}

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiURL = 'https://restcountries.com/v3.1/'

  cacheStore: CacheStore = {} as CacheStore

  constructor(private httpClient: HttpClient) {
    this.cacheStore = this.loadCacheFromLocalStorage()
  }

  private saveCacheIntoLocalStorage(cacheStore: CacheStore) {
    localStorage.setItem('cacheStore', JSON.stringify(cacheStore))
  }

  private loadCacheFromLocalStorage(): CacheStore {
    const cache = localStorage.getItem('cacheStore')
    return cache ? JSON.parse(cache) : INITIAL_CACHE_VALUE
  }

  private getRequest<T>(url: string) {
    return this.httpClient.get<T>(url)
      .pipe(
        catchError(() => of([]))
      )
  }

  searchCapitalByName(searchTerm: string): Observable<Country[]> {
    return this.getRequest<Country[]>(`${this.apiURL}capital/${searchTerm}`)
      .pipe(
        tap((countries) => {

          this.cacheStore.byCapital = {
            searchTerm,
            countries
          }
          this.saveCacheIntoLocalStorage(this.cacheStore)
        }
        ),
      )
  }

  searchCountryByName(searchTerm: string): Observable<Country[]> {
    return this.getRequest<Country[]>(`${this.apiURL}name/${searchTerm}`)
      .pipe(
        tap((countries) => {
          this.cacheStore.byCountry = {
            searchTerm,
            countries
          }

          this.saveCacheIntoLocalStorage(this.cacheStore)
        }
        )
      )
  }
  searchCountryByAlfaCode(alfaCode: string): Observable<Country | null> {
    return this.getRequest<Country[]>(`${this.apiURL}alpha/${alfaCode}`)
      .pipe(
        map(res => res.length > 0 ? res[0] : null)
      )
  }

  searchRegionByName(searchTerm: Region): Observable<Country[]> {
    return this.getRequest<Country[]>(`${this.apiURL}region/${searchTerm}`)
      .pipe(
        tap((countries) => {

          this.cacheStore.byRegion = {
            searchTerm,
            countries
          }

          this.saveCacheIntoLocalStorage(this.cacheStore)
        }
        )
      )
  }

}