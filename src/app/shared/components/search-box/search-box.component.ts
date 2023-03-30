import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>()

  @ViewChild('inputSearch')
  inputSearch!: ElementRef<HTMLInputElement>

  @Input()
  placeholder: string = ''

  @Input()
  defaultSearchTerm: string = ''

  // @Output()
  // onValue: EventEmitter<string> = new EventEmitter()

  @Output()
  onDebounce: EventEmitter<string> = new EventEmitter()

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe((searchTerm) => {
        this.onDebounce.emit(searchTerm)
      })

  }
  ngOnDestroy(): void {
    this.debouncer.unsubscribe()
  }


  // searchByCapital() {
  //   const searchTerm = this.inputSearch.nativeElement.value
  //   if (!searchTerm) {
  //     return
  //   }

  //   this.onValue.emit(searchTerm)
  //   this.inputSearch.nativeElement.value = ''
  // }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm)

  }
}

