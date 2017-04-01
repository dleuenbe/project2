import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

import {AuthenticationService} from '../remote/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  // originally requested url before being logged-in
  public redirectUrl: string;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.authenticationService.loggedIn()) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.redirectUrl = url;
    // Navigate to the login page
    this.router.navigate(['/login']);
    return false;
  }
}
