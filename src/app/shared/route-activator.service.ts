import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RouteActivator implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate (route: ActivatedRouteSnapshot) {
    console.log('called');

    this.authService.getUserInfo().subscribe((res) => {
      if (res) {
        this.router.navigate(['/register']);
      } else {
        return true;
      }
    });


  }

}
