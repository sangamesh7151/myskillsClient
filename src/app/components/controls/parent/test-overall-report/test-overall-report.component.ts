import { Component, OnInit } from '@angular/core';
import { TestOverallReport } from '../../../../models/report/testOverallReport.model';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';
import { TestReportServiceService } from '../../../../services/testReport/test-report.service.service';

@Component({
  selector: 'app-test-overall-report',
  templateUrl: './test-overall-report.component.html',
  styleUrls: ['./test-overall-report.component.scss']
})
export class TestOverallReportComponent implements OnInit {
  overallReport: TestOverallReport;
  constructor(private authService: AuthService, private testReportServiceService: TestReportServiceService, private alertService: AlertService) { }

  showMessage(msg: string): void {
    this.alertService.showMessage('Overall Report ', msg, MessageSeverity.info);
  }

  ngOnInit(): void {
    const parentId = this.authService.currentUser?.id;
    if (parentId) {
      this.testReportServiceService.getOverallTestReportsForParent(parentId).subscribe({
        next: (data) => {
          this.overallReport = data;
        },
        error: (error) => console.error(error)
      });
    }
  }
}
