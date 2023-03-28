import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  @ViewChild('inputSearch')
  inputSearch!: ElementRef<HTMLInputElement>

  @Input()
  placeholder: string = ''

  @Output()
  onValue: EventEmitter<string> = new EventEmitter()

  searchByCapital() {
    const searchTerm = this.inputSearch.nativeElement.value
    if (!searchTerm) {
      return
    }

    this.onValue.emit(searchTerm)
    this.inputSearch.nativeElement.value = ''
  }
}

