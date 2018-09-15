import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
public baseurl = 'https://restcountries.eu/rest/v2/';
  constructor( private httpClient: HttpClient) { }

// language filter
public getLanguage(): any {
const allLanguage = this.httpClient.get(`${this.baseurl}all?fields=languages`);
return allLanguage;
}
// currencies filter
public getCurrencies(): any {
const allLanguage = this.httpClient.get(`${this.baseurl}all?fields=currencies`);
return allLanguage;
}
// get Countries by region
public getCountries(regionName: string): any {
  const allCountries = this.httpClient.get(`${this.baseurl}region/${regionName}`);
  return allCountries;
}
// get Countries by language
public getCountriesByLanguage(languageName: string): any {
  const allCountries = this.httpClient.get(`${this.baseurl}lang/${languageName}`);
  return allCountries;
}
// get Countries by currencies
public getCountriesByCurrencies(currencies: string): any {
  const allCountries = this.httpClient.get(`${this.baseurl}currency/${currencies}`);
  return allCountries;
}

// get single Countries details
public getCountryDetails(alphaCode: string): any {
  const singleCountryDetails = this.httpClient.get(`${this.baseurl}alpha/${alphaCode}`);
  return singleCountryDetails;
}

public getSingleCountryInfoPromise(alphaCode): any {
  return new Promise((resolve, reject) => {
    this.httpClient.get(`${this.baseurl}alpha/${alphaCode}`).subscribe(data => {
      resolve(data);
    }, error => {
      reject(error);
    });
  });
}

}
