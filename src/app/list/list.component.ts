import { Component, OnInit, HostListener } from '@angular/core';
import { ListItem } from './listItem';
import { of, from, PartialObserver } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    style: 'flex: 1;display: flex;'
  }
})
export class ListComponent implements OnInit {

  allData: ListItem[] = [];
  list: ListItem[] = [];
  pages: number[] = [];
  hardDisk = '';
  sorts = ['檔名', '日期', '大小'];
  filterSelectData = {
    art: ['哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密', '哈密哈密']
  };
  sortIs = true;
  isMobile = false;
  showImageFlag = false;
  showImageFlag2 = false;
  selectFlag = false;
  pageValue = 1;
  sortValue = '檔名';
  fixedImagePath = '';
  showDetail = false;
  windowScrolled: boolean;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    for (let i = 0; i < 5; i++) {
      this.allData.push({
        path: 'https://fakeimg.pl/1400x800/?text=test' + i,
        title: 'test',
        actor: 'test',
        num: 'test',
        maker: '',
        date: '',
        genre: '',
        size: 0,
        mdate: 0,
        img: '',
        isSub: true,
        send: 'test'
      });
    }
    this.list = JSON.parse(JSON.stringify(this.allData.filter((v, i) => i < 5)));
    for (let i = 0; i < (this.allData.length / 5 < 1 ? 1 : this.allData.length / 5); i++) {
      this.pages.push(i + 1);
    }
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.onWindowScroll();
  }
  pageChange(page) {
    const start = (page - 1) * 5;
    const end = (page) * 5;
    this.list = JSON.parse(JSON.stringify(this.allData.filter((v, i) => i >= start && i < end)));
  }
  //重讀
  reload() {

  }
  test(evt) {
    console.log(evt);
  }

  search(value) {
    this.list = [];
    from(this.allData)
      .pipe(
        filter((val: ListItem) => val.actor.indexOf(value) !== -1 || val.num.indexOf(value) !== -1 || val.genre.indexOf(value) !== -1))
      .subscribe((obs) => this.list.push(obs));
  }

  openFile(item: ListItem) {
    this.http.post(`http://localhost:8080/getDisk?isMobile = ${this.isMobile}`, item).subscribe((res: string) => {
      if (this.isMobile) {
        window.open(res);
      }
    });
  }
  deleteFile(item: ListItem) {
    this.http.post(`http://localhost:8080/getDisk?isMobile = ${this.isMobile}`, item).subscribe((res: string) => {
      if (this.isMobile) {
        window.open(res);
      }
    });
  }
  goToTop() {
    window.scroll(0, 0);
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
}
