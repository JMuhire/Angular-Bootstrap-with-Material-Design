import {LinksComponent} from './links.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NavbarComponent} from './navbar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavbarComponent, LinksComponent],
  exports: [NavbarComponent, LinksComponent]
})
export class NavbarModule {}
