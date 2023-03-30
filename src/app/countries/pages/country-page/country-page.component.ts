import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Country, Translation } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.services';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})
export class CountryPageComponent implements OnInit {

  country: Country = {} as Country
  loading: boolean = false
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByAlfaCode(id))
      )
      .subscribe(res => {
        if (res) {
          this.country = res
          this.loading = false
          return
        }
        this.router.navigateByUrl('')
      })

  }

  get allTranslations(): Translation[] {
    return Object.values(this.country.translations)
  }

}
