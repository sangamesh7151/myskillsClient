import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RecentActivity } from '../../../../models/activity/recent-activity.model';
import { AlertService } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';
import { TestReportServiceService } from '../../../../services/testReport/test-report.service.service';

@Component({
  selector: 'app-recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss']
})
export class RecentActivitiesComponent implements OnInit {
  // Sample recent activities data
  currentTestDetails = {};
  @ViewChild('testViewModal', { static: true })
  testViewModal: ModalDirective;
  recentActivities: RecentActivity[];
  currentTestId: number;
  currentAttemptId: number;
  currentUserId: string;
  showActivity: boolean = false;
  showMoreActivities = false;
  startDate: Date;
  endDate: Date;
  // recentActivities = this.initialRecentActivities;

  constructor(private authService: AuthService, private testReportServiceService: TestReportServiceService, private alertService: AlertService) { }

  ngOnInit(): void { this.filterActivitiesByDate(); }

  viewTestDetails(activity) {
    console.log('activity  log information');
    console.log(activity);
    this.currentTestId = activity?.testId;
    this.currentAttemptId = activity?.attemptId;
    this.currentUserId = activity?.userId;
    this.showActivity = true;
    this.testViewModal.show();
    // Logic to handle viewing test details
    // $('#testDetailsModal').modal('show'); // Open the modal
  }

  onTestDetailsHidden() { this.testViewModal.hide(); }

  filterActivitiesByDate() {
    this.testReportServiceService.getRecentActivities().subscribe({
      next: (data) => {
        // Assuming you want to filter activities to show only past completed tests
        const currentDate = new Date();
        this.recentActivities = data.filter(activity =>
          activity.isCompletedTest && new Date(activity.activityDate) < currentDate
        );

        // Your comment about chart data seems out of context since there's no chart logic here.
        // If you need to update chart data, include that logic as well based on your filtered activities.
      },
      error: (error) => console.error(error)
    });
  }


  viewAllActivities() {

    
    // Logic to expand or redirect to a detailed view
    console.log("View more activities");
  }
}
