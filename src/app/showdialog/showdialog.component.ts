import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-showdialog',
  templateUrl: './showdialog.component.html',
  styleUrls: ['./showdialog.component.css']
})
export class ShowdialogComponent implements OnInit {
  page: string;
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(v => {
      if (!v.page) {
        this.router.navigate(['/showdailog'], { queryParams: { page: 1, path: 'local' } });
      }
      this.page = v.page;
    });
  }

}
