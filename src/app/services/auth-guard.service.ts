// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';
import { UserType } from '../models/enums';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {

    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string, route?: ActivatedRouteSnapshot): boolean {
    console.log('checkLogin');
    if (this.authService.isLoggedIn) {
      const userTypeString = this.authService.currentUser.userType; // Assume it's a string like "Parent"
      const userType = UserType[userTypeString as unknown as keyof typeof UserType];

      // If navigating to a dashboard route, check the requiredUserType
      if (route && route.data.requiredUserType && userType !== route.data.requiredUserType) {
        console.log('User type does not match required type for route');
        // Redirect to an appropriate page if the user type doesn't match
        this.router.navigate(['/']); // Adjust as needed
        return false;
      }

      if (url === '/login' || url === '/') {
        this.navigateToDashboard();
        return false; // Prevent navigation to /login or root since we're redirecting
      }
      return true; // User is logged in and not navigating to /login or root
    }

    this.authService.loginRedirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }


  navigateToDashboard(): void {
   // const userType = this.authService.currentUser.userType;

    const userTypeString = this.authService.currentUser.userType; // Assume it's a string like "Parent"
    const userType = UserType[userTypeString as unknown as keyof typeof UserType];

    console.log('userType');
    console.log(userType);
    switch (userType) {
      case UserType.Learner:
      case UserType.Child:
        this.router.navigate(['/dashboard-learner']);
        break;
      case UserType.Parent:
      case UserType.Teacher:
        console.log('userType Parent');
        this.router.navigate(['/dashboard-parent']);
        break;
      case UserType.Admin:
        // Navigate to a default dashboard or specific ones if they exist
        this.router.navigate(['/dashboard']);
        break;
      default:
        // Handle unknown user type if necessary
        break;
    }
  }

}
