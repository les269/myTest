import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ShowdialogComponent } from './showdialog/showdialog.component';
import { AppRoutingModule } from './app-routing.module';
import { Dialog2Component } from './dialog2/dialog2.component';
import { ListComponent } from './list/list.component';
import { TestDirective } from './test.directive';
import { CustomInputComponent } from './util/custom-input/custom-input.component';
import { MessengerComponent } from './messenger/messenger.component';
import { StompService } from 'ng2-stomp-service';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ShowdialogComponent,
    Dialog2Component,
    ListComponent,
    TestDirective,
    CustomInputComponent,
    MessengerComponent
  ],
  entryComponents: [Dialog2Component],
  imports: [
    BrowserModule,
    HttpClientModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: 'stompService', useClass: StompService }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
