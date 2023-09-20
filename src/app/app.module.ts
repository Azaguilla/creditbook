import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/base-component/footer/footer.component';
import { HeaderComponent } from './component/base-component/header/header.component';
import { CreditComponent } from './component/credit/credit.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { StatistiqueComponent } from './component/statistique/statistique.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HomePageComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreditComponent,
    StatistiqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
