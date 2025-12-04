import { Component, signal } from '@angular/core';
import { SearchInput } from '../../../components/search-input/search-input';
import { CountryList } from '../../../components/country-list/country-list';
import { Country } from '../../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countries = signal<Country[]>([]);

  onSearch(value: string) {
    console.log({ value });
  }
}
