import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AppTranslationService } from '../../../../services/app-translation.service';

@Component({
  selector: 'app-test-inprogress-report',
  templateUrl: './test-inprogress-report.component.component.html',
  styleUrls: ['./test-inprogress-report.component.component.scss']
})
export class TestInprogressReportComponentComponent implements OnInit {
  columns: any[] = [];
  rows: any[] = [];
  @ViewChild('indexTemplate', { static: true })
  indexTemplate: TemplateRef<any>;
  @ViewChild('userNameTemplate', { static: true })
  userNameTemplate: TemplateRef<any>;
  loadingIndicator: boolean;

  constructor(private translationService: AppTranslationService) { }

  ngOnInit(): void {
    const gT = (key: string) => this.translationService.getTranslation(key);
    this.columns = [
      { prop: 'index', name: '#', width: 40, cellTemplate: this.indexTemplate, canAutoResize: false },
      { prop: 'testName', name: "Test Name", width: 90, cellTemplate: this.userNameTemplate }, // Updated prop and label name
      { prop: 'grade', name: "Grade", width: 120 }, // No change needed
      { prop: 'assignedCount', name: "Assigned Count", width: 140 }, // Added "Count" for clarity
      { prop: 'completedCount', name: "Completed Count", width: 140 }, // Added "Count" for clarity
      { prop: 'pendingCount', name: "Pending to Complete", width: 140 } // Changed to "pendingCount" and adjusted label for clarity
    ];

  }

}
