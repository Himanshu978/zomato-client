import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestaurantService {

constructor (private http: HttpClient) {}

private setHeaders(): HttpHeaders {

  const headersConfig = {
    Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    'Content-Type': 'application/json',
     Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',

  };
  return new HttpHeaders(headersConfig);
  }

getAllRestuarnats() {

  const headers = this.setHeaders();
  const url = `http://zomato.test/api/restaurants`;

  return this.http.get(url, {headers: headers});

}

getRestaurant(id) {
  const headers = this.setHeaders();
  const url = `http://zomato.test/api/restaurants/${id}`;

  return this.http.get(url, {headers: headers});
}

getReviews(id) {
  const headers = this.setHeaders();
  const url = `http://zomato.test/api/restaurants/${id}/reviews`;

  return this.http.get(url, {headers: headers});
}

getFoods(id) {
  const headers = this.setHeaders();
  const url = `http://zomato.test/api/restaurants/${id}/foods`;

  return this.http.get(url, {headers: headers});
}

placeOrder(orderData) {
  const headers = this.setHeaders();
  const url = `http://zomato.test/api/orders`;

  return this.http.post(url, orderData, {headers: headers});
}

}
