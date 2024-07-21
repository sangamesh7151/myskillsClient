import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserTestReport } from '../../../../models/report/userTestReport.model';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';
import { TestReportServiceService } from '../../../../services/testReport/test-report.service.service';

@Component({
  selector: 'app-user-test-report',
  templateUrl: './user-test-report.component.html',
  styleUrls: ['./user-test-report.component.scss']
})
export class UserTestReportComponent implements OnInit {

  userTestReport: UserTestReport;
  constructor(private authService: AuthService, private testReportServiceService: TestReportServiceService, private alertService: AlertService, private route: ActivatedRoute) { }

  showMessage(msg: string): void {
    this.alertService.showMessage('Overall Report ', msg, MessageSeverity.info);
  }

  //ngOnInit(): void {
  //  const parentId = this.authService.currentUser?.id;
  //  if (parentId) {
  //    this.testReportServiceService.getUserTestReport(parentId).subscribe({
  //      next: (data) => {
  //        this.userTestReport = data;
  //      },
  //      error: (error) => console.error(error)
  //    });
  //  }
  //}

  ngOnInit(): void {
    // Check for userId in the route parameters first
    this.route.paramMap.subscribe(params => {
      const userIdFromRoute = params.get('id'); // Adjust 'id' if your parameter has a different name
      const userId = userIdFromRoute || this.authService.currentUser?.id;

      if (userId) {
        this.loadUserTestReport(userId);
      } else {
        console.error('No user ID available');
      }
    });
  }
  loadUserTestReport(userId: string) {
    this.testReportServiceService.getUserTestReport(userId).subscribe({
      next: (data) => {
        this.userTestReport = data;
      },
      error: (error) => console.error(error)
    });
  }
}
