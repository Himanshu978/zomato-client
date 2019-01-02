import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() userInfo: any;
 // userInfo: any;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  //   if (window.localStorage.getItem('userInfo')) {
  //     this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
  // }

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.userInfo = null;
  }

}
