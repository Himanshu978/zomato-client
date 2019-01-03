import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() userInfo: any;
  @Output() loggedOut: EventEmitter<any> = new EventEmitter();


  constructor(private authService: AuthService,
    private router: Router) {

     // this.userInfo = this.authService.getUserInfo();
     }

  ngOnInit() {
  //   if (window.localStorage.getItem('userInfo')) {
  //     this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  // }
  }

  logout() {
    this.userInfo = null;
    console.log(this.userInfo);
    this.authService.logout();
    this.router.navigate(['/login']);
    this.loggedOut.emit(null);
  }

}
