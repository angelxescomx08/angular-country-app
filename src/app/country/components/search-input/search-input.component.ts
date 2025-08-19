import { Component, effect, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  searchValue = output<string>();

  inputValue =  signal<string>("");

  debounceEffect = effect((onCleanUp)=> {
    const value = this.inputValue();

    const timeout = setTimeout(()=>{
      this.searchValue.emit(value)
    }, 400)

    onCleanUp(()=>{
      clearTimeout(timeout);
    })
  })

  onSearch(value: string) {
    this.searchValue.emit(value);
  }
}
