import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
userInfo: any;

constructor (private http: HttpClient) {}

registerUser(data) {

  let options = { headers : new HttpHeaders( { 'Content-Type': 'application/json'})};

  return this.http.post('http://zomato.test/api/register', data, options);
}

login (data) {
  let options = { headers : new HttpHeaders( { 'Content-Type': 'application/json'})};

  return this.http.post('http://zomato.test/api/login', data, options);
}

logout() {
  localStorage.clear();
  return null;
}

getUserInfo() {
  if (window.localStorage.getItem('userInfo')) {
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    return this.userInfo;
  } else {
    return '';
  }
}

}
