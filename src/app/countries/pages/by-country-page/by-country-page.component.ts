import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces';
import { CountriesService } from '../../services/countries.services';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {
  countries: Country[] = []
  isLoading: boolean = false
  defaultSearchTerm: string = ''

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    const { searchTerm, countries } = this.countriesService.cacheStore.byCountry
    this.defaultSearchTerm = searchTerm
    this.countries = countries
  }

  searchByCountry(term: string) {
    if (!term) {
      return
    }

    this.isLoading = true
    this.countries = []
    this.countriesService.searchCountryByName(term).subscribe((countries: Country[]) => {
      this.isLoading = false
      this.countries = countries
    })
  }
}
