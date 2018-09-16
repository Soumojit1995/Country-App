import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService} from '../api.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {

  public currentCountry ;
  public isVisible = false;
  public topLevelDomain = '';
  public callingCodes = '';
  public altSpellings = '';
  public latLang = '';
  public timeZones = '';
  public currencies = '';
  public translations = Object.keys;
  borderCountries = [];


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private location: Location) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.isVisible = false;

      this.currentCountry = this.api.getCountryDetails(param.get('alphaCode')).subscribe(data => {
        console.log(data);
        this.currentCountry = data;
        this.getTopLevelDomain(this.currentCountry);
        this.getCallingCodes(this.currentCountry);
        this.getAltSpellings(this.currentCountry);
        this.getLatLang(this.currentCountry);
        this.getTimeZones(this.currentCountry);
        this.getCurrencies(this.currentCountry);
        this.getBorderCountries(this.currentCountry['borders']);
        this.isVisible = true;
      }, error => {
        alert('Internet Error');
      });
    }, error => {
      console.log('no param found');
    });
  }
// get TopLevelDomain and add comma
  public getTopLevelDomain(currentObj: any) {
    let temp = '';
    for (let i = 0; i < currentObj.topLevelDomain.length; i++) {
      const comma = i === currentObj.topLevelDomain.length - 1 ? ' ' : ', ';
      temp += `${currentObj.topLevelDomain[i]}${comma}`;
    }
    this.topLevelDomain = temp;
  }
// get Calling Codes and add comma
  public getCallingCodes(currentObj: any) {
    let temp = '';
    for (let i = 0; i < currentObj.callingCodes.length; i++) {
      const comma = i === currentObj.callingCodes.length - 1 ? ' ' : ', ';
      temp += `${currentObj.callingCodes[i]}${comma}`;
    }
    this.callingCodes = temp;
  }

// get Alt Spellings and add comma
  public getAltSpellings(currentObj: any) {
    let temp = '';
    for (let i = 0; i < currentObj.altSpellings.length; i++) {
      const comma = i === currentObj.altSpellings.length - 1 ? ' ' : ', ';
      temp += `${currentObj.altSpellings[i]}${comma}`;
    }
    this.altSpellings = temp;
  }
// get LatLang and add &
  public getLatLang(currentObj: any) {
    let temp = '';
    for (let i = 0; i < currentObj.latlng.length; i++) {
      const and = i === currentObj.latlng.length - 1 ? ' ' : ' & ';
      temp += `${currentObj.latlng[i]}${and}`;
    }
    this.latLang = temp;
  }
// get TimeZones and add comma
  public getTimeZones(currentObj: any) {
    let temp = '';
    for (let i = 0; i < currentObj.timezones.length; i++) {
      const comma = i === currentObj.timezones.length - 1 ? ' ' : ', ';
      temp += `${currentObj.timezones[i]}${comma}`;
    }
    this.timeZones = temp;
  }
  // get currencies and add comma
  public getCurrencies(currentObj: any) {
    let temp = '';
    for (let i = 0; i < currentObj.currencies.length; i++) {
      const comma = i === currentObj.currencies.length - 1 ? ' ' : ', ';
      temp += `${currentObj.currencies[i]}${comma}`;
    }
    this.currencies = temp;
  }

  // get border countries details
  async getBorderCountries(borderCountries: string[]) {
    const tempBorder = [];

    for (const i of borderCountries) {
      const info = await this.api.getSingleCountry(i);
      tempBorder.push(info);
    }
    this.borderCountries = tempBorder;
    console.log(this.borderCountries);
  }
// back page function
  public goBack() {
    this.location.back();
  }


}
