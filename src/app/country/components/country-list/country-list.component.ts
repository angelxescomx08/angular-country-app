import { Component, input } from '@angular/core';
import { Country } from '../../types/country.type';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {
  countries = input.required<Country[]>();

  errorMessage = input<unknown>()
  isLoading = input<boolean>(false)
  isEmpty = input<boolean>(false)

}
