import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.services';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {
  countries: Country[] = []

  constructor(private countriesService: CountriesService) { }

  searchByRegion(term: string) {
    if (!term) {
      return
    }

    this.countriesService.searchRegionByName(term).subscribe((countries: Country[]) => {
      this.countries = countries
    })
  }
}
