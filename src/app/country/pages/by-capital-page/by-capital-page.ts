import { Component, effect, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { lastValueFrom } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource<Country[], string>({
    loader: async () => {
      const query = this.query();
      if (!query) return [];

      return lastValueFrom(this.countryService.searchByCapital(query));
    },
  });

  constructor() {
    // Recargar el resource cuando cambie el query
    effect(() => {
      this.query(); // Leer el signal para que se reactive
      this.countryResource.reload();
    });
  }

  // isLoading = signal(false);
  // isError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return; // Si está cargando, no hacer nada

  //   this.isLoading.set(true); // Indicar que está cargando
  //   this.isError.set(null); // Resetear el error

  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false);
  //       this.countries.set(countries);
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false);
  //       this.countries.set([]);
  //       this.isError.set(`No se encontró un país con esa capital ${query}`);
  //     },
  //   });
  // }
}
