import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.services';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {
  countries: Country[] = []

  constructor(private countriesService: CountriesService) { }

  searchByCountry(term: string) {
    if (!term) {
      return
    }

    this.countriesService.searchCountryByName(term).subscribe((countries: Country[]) => {
      this.countries = countries
    })
  }
}
