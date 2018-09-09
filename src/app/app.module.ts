import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegionComponent } from './region/region.component';
import { AllCountriesComponent } from './all-countries/all-countries.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { NotfoundPageComponent } from './notfound-page/notfound-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiService} from './api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { patch } from 'webdriver-js-extender';

@NgModule({
  declarations: [
    AppComponent,
    RegionComponent,
    AllCountriesComponent,
    CountryDetailsComponent,
    NotfoundPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'home', component: RegionComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'region/:id', component: AllCountriesComponent},
      {path: 'country/:alphaCode', component: CountryDetailsComponent},
      {path: '**', component: NotfoundPageComponent}
    ])

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
