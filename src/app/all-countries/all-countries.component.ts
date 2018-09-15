import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService} from '../api.service';
import {Location} from '@angular/common';
import { animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.css'],
  animations: [
    trigger('fadeIn', [
      transition( ':enter', [
        style({opacity: '0'}),
        animate('1s ease-out', style({opacity: '1'})),
      ]),
    ]),
  ]
})
export class AllCountriesComponent implements OnInit {
 public allCountries: any;
 public currentRegion: string;
 public isVisible = false;
  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private location: Location) { }

  ngOnInit() {

    this.route.paramMap.subscribe(param => {
      this.isVisible = false;
      const flag = this.IsJsonString(param.get('id'));
      console.log(flag);
      if (flag) {
        const jsonParam = JSON.parse(param.get('id'));
        console.log(jsonParam);
        if (jsonParam.hasOwnProperty('currency')) {
          this.getCountriesByCurrency(jsonParam['currency']);
        }
        if (jsonParam.hasOwnProperty('language')) {
          this.getCountriesByLanguage(jsonParam['language']);
        }
      } else {
        this. getCountriesByRegion(param.get('id'));
      }

    }, error => {
      console.log('no param found');
    });
  }

public getCountriesByRegion(region) {
this.allCountries = this.api.getCountries(region).subscribe( data => {
this.currentRegion = region;
this.allCountries = data;
console.log(this.allCountries);
this.isVisible = true;
}, err => {
  console.log(err);
});

}
public getCountriesByCurrency(currency: string) {
  this.allCountries = this.api.getCountriesByCurrencies(currency).subscribe(data => {
    this.currentRegion = '';
    console.log(data);
    this.allCountries = data;
    this.isVisible = true;
  }, error => {
    alert('Internet Error');
  });
}

public getCountriesByLanguage(lang: string) {
  this.allCountries = this.api.getCountriesByLanguage(lang).subscribe(data => {
    this.currentRegion = '';
    console.log(data);
    this.allCountries = data;
    this.isVisible = true;
  }, error => {
    alert('Internet Error');
  });
}
public goBack() {
  this.location.back();
}
public IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
}
