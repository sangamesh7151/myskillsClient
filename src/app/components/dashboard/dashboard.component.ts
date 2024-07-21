import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AccountService } from '../../services/account.service';
import { Permission } from '../../models/permission.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isUserLoggedIn: boolean;
  constructor(private router: Router, private authService: AuthService, private accountService: AccountService,) { }
  goToLogin(userType: string) {
    this.router.navigate(['/login'], { queryParams: { userType } });
  }
  ngOnInit(): void {
    console.log('not navigated to parent')
    this.isUserLoggedIn = this.authService.isLoggedIn;
    //if (this.isUserLoggedIn ) {
    //  //console.log('navigated to parent')
    //  //this.router.navigate(['/parentdashboard']);
    //}
    // Navigate based on the user's role
    //if (userRole === 'parent') {
    //  this.router.navigate(['/parent-dashboard']);
    //} else if (userRole === 'learner') {
    //  this.router.navigate(['/learner-dashboard']);
    //} else if (userRole === 'admin') {
    //  this.router.navigate(['/admin-dashboard']);
    //} else {
    //  // Handle other roles or scenarios
    //}

  }

  get canNavigateToParentDashboard() {
    return this.accountService.currentUser.roles.includes('parent'); // eg. viewProductsPermission
  }

}
