import { Component, input } from '@angular/core';
import { Country } from '../../types/country.type';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {
  countries = input.required<Country[]>();
}
