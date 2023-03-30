import { Component, OnInit } from '@angular/core';
import { Country, Region } from '../../interfaces';
import { CountriesService } from '../../services/countries.services';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {
  countries: Country[] = []
  isLoading: boolean = false
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Oceania']
  selectedRegion?: Region

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    const { searchTerm, countries } = this.countriesService.cacheStore.byRegion
    this.selectedRegion = searchTerm as Region
    this.countries = countries
  }

  searchByRegion(region: Region) {
    if (!region) {
      return
    }
    this.selectedRegion = region
    this.isLoading = true
    this.countries = []
    this.countriesService.searchRegionByName(region).subscribe((countries: Country[]) => {
      this.isLoading = false
      this.countries = countries
    })
  }

}
