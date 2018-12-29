import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CoreService {

constructor (private http: HttpClient) {}

getStates() {

  let options = { headers : new HttpHeaders( { 'Content-Type': 'application/json'})};

  return this.http.get('http://zomato.test/api/states', options);

}

getDistricts (id) {
  let options = { headers : new HttpHeaders( { 'Content-Type': 'application/json'})};

  const url = `http://zomato.test/api/districts/${id}/`;

  return this.http.get(url, options);

}


}
