import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.services';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {
  countries: Country[] = []

  constructor(private countriesService: CountriesService) { }

  searchByCapital(term: string) {
    if (!term) {
      return
    }

    this.countriesService.searchCapitalByName(term).subscribe((countries: Country[]) => {
      this.countries = countries
    })
  }

}
