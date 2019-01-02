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

getImage(path) {
  const headers = new HttpHeaders({
    // Authorization: 'Bearer ' + window.localStorage.getItem('token'),
    // 'Content-Type': 'application/json',
    // Accept: 'application/json',
    // Accept: 'text/plain',
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Headers': 'Content-Type',

  });

  const url = `http://zomato.test/api/restaurants/image/${path}`;

  return this.http.get(url, {headers: headers, responseType: 'text'});

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

getOrders() {
  const headers = this.setHeaders();
  const url = `http://zomato.test/api/orders`;

  return this.http.get(url, {headers: headers});
}

addRestauarant(restaurantData) {
  const headers = this.setHeaders();
  const url = `http://zomato.test/api/restaurants`;

  return this.http.post(url, restaurantData, {headers: headers});
}

}
