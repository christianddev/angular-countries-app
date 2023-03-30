import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces';
import { CountriesService } from '../../services/countries.services';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {
  countries: Country[] = []
  isLoading: boolean = false
  defaultSearchTerm: string = ''

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
    const { searchTerm, countries } = this.countriesService.cacheStore.byCapital
    this.defaultSearchTerm = searchTerm
    this.countries = countries
  }

  searchByCapital(term: string) {
    if (!term) {
      return
    }
    this.isLoading = true
    this.countries = []
    this.countriesService.searchCapitalByName(term).subscribe((countries: Country[]) => {
      this.isLoading = false
      this.countries = countries
    })
  }

}
