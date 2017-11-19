import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppComponent} from './app.component';
import {MDBBootstrapModule} from '../../../src';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MDBBootstrapModule.forRoot(), RouterModule.forRoot([])],
  bootstrap: [AppComponent]
})
export class AppModule {}
