import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService} from './api.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Country-App';
  codeForRouting = '';
  public allCurrency = [];
  allLanguages = [];
  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private location: Location) { }

  ngOnInit() {
  }
// language filter function
public LanguageFilter() {
  this.api.getLanguage().subscribe(data => {
    const lang = data;
    let languagePush = [];
    for ( let i = 0; i < lang.length; i++) {
    for ( let j = 0; j < lang[i]['languages'].length; j++) {
    languagePush.push(lang[i]['languages'][j]['iso639_1']);
    }
   }
    languagePush = languagePush.filter( function (element) {
    return element !== undefined && element !== 'null' && element !== '';
    });
    languagePush = languagePush.filter( function (element, index) {
    return languagePush.indexOf(element) === index;
    });
    languagePush = languagePush.sort();
    this.allLanguages = languagePush;
    console.log(languagePush);
  }, err => { console.log(err); });

}// end language filter
// Currency filter function
CurrencyFilter() {
  this.api.getCurrencies().subscribe(data => {
    const lang = data;
    let currenciesPush = [];
    for ( let i = 0; i < lang.length; i++) {
    for ( let j = 0; j < lang[i]['currencies'].length; j++) {
      currenciesPush.push(lang[i]['currencies'][j]['code']);
    }
   }
   currenciesPush = currenciesPush.filter( function (element) {
     return element !== undefined && element !== 'null' && element !== '' && element !== '(none)';
   });
   currenciesPush = currenciesPush.filter( function (element, index) {
     return currenciesPush.indexOf(element) === index;
   });
   currenciesPush = currenciesPush.sort();
    console.log(currenciesPush);
    this.allCurrency = currenciesPush;
   }, err => { console.log(err); });
    }




    public showCountriesByCurrencyFiltered() {
      if (this.codeForRouting !== '') {
        this.router.navigate(['/region', JSON.stringify({'currency': this.codeForRouting})]);
      } else {
        alert('please select a currency');
      }
    }

    public showCountriesByLanguageFiltered() {
      if (this.codeForRouting !== '') {
        this.router.navigate(['/region', JSON.stringify({'language': this.codeForRouting})]);
      } else {
        alert('please select a language');
      }
    }
}



