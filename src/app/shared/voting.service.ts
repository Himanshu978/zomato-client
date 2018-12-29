import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class VotingService {
  constructor(private http: HttpClient) { }

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


  vote(votingData) {

    const options = { headers : this.setHeaders()};

   return this.http.post('http://zomato.test/api/vote', votingData, options);
  }
}
