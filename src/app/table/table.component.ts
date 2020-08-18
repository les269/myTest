import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { MatTable, MatCheckboxChange, MatSliderChange } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

require('jexcel/dist/jexcel.css');

export interface TableData {
  txt: number;
  url: string;
}
export interface CountryType {
  name: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['txt', 'url'];
  dataSource: TableData[] = [];
  countries: string[] = ['123', '123', '123'];
  options: string[] = ['One', 'Two', 'Three'];
  myControl = new FormControl();
  name = new FormControl();
  filteredOptions: Observable<string[]>;
  surveyForm: FormGroup;
  posts$: Observable<any>;
  indeterminateSelectedPayFor: boolean;
  @ViewChild('table1', null) table: MatTable<TableData>;

  constructor(public dialog: MatDialog, private http: HttpClient) {

    this.surveyForm = new FormGroup({
      mainQuestions: new FormGroup({
        payForAll: new FormControl(false),
        payForBook: new FormControl(false),
        payForMusic: new FormControl(false),
        payForMovie: new FormControl(false),
        angularMaterialLikeScore: new FormControl(5)
      }),
      otherQuestions: new FormGroup({
        favoriteColorRed: new FormControl(0),
        favoriteColorGreen: new FormControl(0),
        favoriteColorBlue: new FormControl(0)
      }),
    });
  }

  ngOnInit() {
    this.posts$ = this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts').pipe(map(posts => {
      return posts.slice(0, 6);
    }));
    from(Array(100)).pipe(
      map((val, index) => {
        return { txt: index, url: 'https://fakeimg.pl/1000x540/' };
      })
    ).subscribe(val => this.dataSource.push(val));
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  showDialog() {
  }
  showJson() {
    this.http.get('assets/test.json').subscribe(data => console.log(data), error => console.log(error));
  }
  dropTable(event: CdkDragDrop<TableData[]>) {
  }
  checkAllChange($event: MatCheckboxChange) {
    this.surveyForm
      .get('mainQuestions')
      .get('payForBook')
      .setValue($event.checked);
    this.surveyForm
      .get('mainQuestions')
      .get('payForMusic')
      .setValue($event.checked);
    this.surveyForm
      .get('mainQuestions')
      .get('payForMovie')
      .setValue($event.checked);
    this._setSelectAllState();
  }

  payForChange() {
    this._setSelectAllState();
  }
  private _setSelectAllState() {
    const payForBook = this.surveyForm.get('mainQuestions').get('payForBook').value;
    const payForMusic = this.surveyForm.get('mainQuestions').get('payForMusic').value;
    const payForMovie = this.surveyForm.get('mainQuestions').get('payForMovie').value;
    const count = (payForBook ? 1 : 0) + (payForMusic ? 1 : 0) + (payForMovie ? 1 : 0);
    this.surveyForm.get('mainQuestions').get('payForAll').setValue(count === 3);
    this.indeterminateSelectedPayFor = count > 0 && count < 3;
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onInputChange(evt: MatSliderChange) {
    return `rgb(${this.selectedColorRed}, ${this.selectedColorGreen}, ${this.selectedColorBlue})`;
  }

  get selectedColorRed() {
    return this.surveyForm.get('otherQuestions').get('favoriteColorRed').value;
  }

  get selectedColorGreen() {
    return this.surveyForm.get('otherQuestions').get('favoriteColorGreen').value;
  }

  get selectedColorBlue() {
    return this.surveyForm.get('otherQuestions').get('favoriteColorBlue').value;
  }

  // 組合顏色樣式
  get selectedColorStyle() {
    return `rgb(${this.selectedColorRed}, ${this.selectedColorGreen}, ${this.selectedColorBlue})`;
  }

  search(key: string) {
    console.log(key);
  }
}


