import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found';
import { CountryService } from '../../services/country.service';
import { CountryInformationComponent } from "./country-information/country-information";

@Component({
  selector: 'app-country-page',
  imports: [
    NotFoundComponent,
    CountryInformationComponent
],

  templateUrl: './country-page.html',
})
export class CountryPage {

 countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params }) => {
      return this.countryService.searchCountryByAlphaCode(params.code);
    },
  });

}
