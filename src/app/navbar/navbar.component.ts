import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo: any;

  constructor() { }

  ngOnInit() {
    if (window.localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  }

  }

}
