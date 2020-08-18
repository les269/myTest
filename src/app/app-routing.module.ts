import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { ShowdialogComponent } from './showdialog/showdialog.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'showdailog', component: ShowdialogComponent },
  { path: 'list', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
