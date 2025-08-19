import { Component, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  searchValue = output<string>();

  onSearch(value: string) {
    this.searchValue.emit(value);
  }
}
