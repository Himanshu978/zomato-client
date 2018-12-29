import { Injectable } from '@angular/core';
import { CommentService } from './comment.service';
import { HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class ReviewService {

  constructor(
    private http: HttpClient) { }

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

 submitReview(data, id) {
   data.restaurant_id = id;
  let options = { headers : this.setHeaders()};
  console.log(id);

  return this.http.post('http://zomato.test/api/reviews', data, options);
 }


}
