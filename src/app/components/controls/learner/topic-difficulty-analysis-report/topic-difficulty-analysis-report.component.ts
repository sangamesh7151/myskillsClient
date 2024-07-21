import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopicDifficultyAnalysisReport } from '../../../../models/report/topicDifficultyAnalysisReport.model';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';
import { TestReportServiceService } from '../../../../services/testReport/test-report.service.service';

@Component({
  selector: 'app-topic-difficulty-analysis-report',
  templateUrl: './topic-difficulty-analysis-report.component.html',
  styleUrls: ['./topic-difficulty-analysis-report.component.scss']
})
export class TopicDifficultyAnalysisReportComponent implements OnInit, OnChanges {

  @Input() parentId: string;
  @Input() subjectId: number;

  topicDifficultyAnalysisReport: TopicDifficultyAnalysisReport[];

  constructor(
    private authService: AuthService,
    private testReportServiceService: TestReportServiceService,
    private alertService: AlertService
  ) { }

  showMessage(msg: string): void {
    this.alertService.showMessage('Overall Report ', msg, MessageSeverity.info);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.parentId || changes.subjectId) {
      this.loadData();
    }
  }

  ngOnInit() {

    console.log('TopicDifficultyAnalysisReportComponent');
    console.log(this.parentId);
    console.log(this.subjectId);
    this.loadData();
  }

  getTableRowClass(index: number): string {
    const classes = ['table-active', 'table-primary', 'table-secondary', 'table-success', 'table-danger', 'table-warning'];
    return classes[index % classes.length];
  }

  loadData(): void {
    if (this.parentId && this.subjectId) {
      this.testReportServiceService.getTopicAndDifficultyWiseAnalysisForUser(this.parentId, this.subjectId).subscribe({
        next: (data) => {
          this.topicDifficultyAnalysisReport = data;
        },
        error: (error) => console.error(error)
      });
    } else {
      console.error('parentId and subjectId are required');

    }
  }
}
