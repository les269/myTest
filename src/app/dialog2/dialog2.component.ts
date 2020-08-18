import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog2',
  templateUrl: './dialog2.component.html',
  styleUrls: ['./dialog2.component.css']
})
export class Dialog2Component implements OnInit {
  items = [];
  constructor() { }

  ngOnInit() {
    for (let index = 0; index < 100; index++) {
      this.items.push(index);

    }
  }

}
