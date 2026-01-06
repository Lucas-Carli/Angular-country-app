import { Component, inject, signal } from '@angular/core';
import { SearchInput } from '../../../components/search-input/search-input';
import { CountryList } from '../../../components/country-list/country-list';
import { of } from 'rxjs';
import { CountryService } from '../../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: this.query,
    stream: ({ params }) => {
      if (!params) return of([])
      return this.countryService.searchByCountry(params)
    }
  })

  // countryResources = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return []
  //     return await firstValueFrom(
  //       this.countryService.searchByCountry(params.query)
  //     )
  //   }
  // })
}
