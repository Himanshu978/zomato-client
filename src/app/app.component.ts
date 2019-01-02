import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zomato';


  getUserInfo() {
    if (window.localStorage.getItem('userInfo')) {
      return JSON.parse(window.localStorage.getItem('userInfo'));
    }
    return null;
  }
}
