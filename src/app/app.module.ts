import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesComponent } from './pages/pages.component';
import { HeadercomponentComponent } from './shared/headercomponent/headercomponent.component';
import { SideMenuComponent } from './shared/side-menu/side-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HeadercomponentComponent,
    SideMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
