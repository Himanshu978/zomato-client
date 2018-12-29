import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

constructor (private http: HttpClient) {}

registerUser(data) {

  let options = { headers : new HttpHeaders( { 'Content-Type': 'application/json'})};

  console.log(data);

  return this.http.post('http://zomato.test/api/register', data, options);

}

login (data) {
  let options = { headers : new HttpHeaders( { 'Content-Type': 'application/json'})};

  console.log(data);

  return this.http.post('http://zomato.test/api/login', data, options);

}





}
