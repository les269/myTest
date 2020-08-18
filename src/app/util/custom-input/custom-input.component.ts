import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {
  key = '';
  @Input() showSearch;
  @Output() doSearch = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.showSearch = this.showSearch === 'true';
  }

  search() {
    this.doSearch.emit(this.key);
  }

}
