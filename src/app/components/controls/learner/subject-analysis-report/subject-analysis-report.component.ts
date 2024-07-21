import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SubjectAnalysisReport } from '../../../../models/report/subjectAnalysisReport.model';
import { AlertService, MessageSeverity } from '../../../../services/alert.service';
import { AuthService } from '../../../../services/auth.service';
import { TestReportServiceService } from '../../../../services/testReport/test-report.service.service';

@Component({
  selector: 'app-subject-analysis-report',
  templateUrl: './subject-analysis-report.component.html',
  styleUrls: ['./subject-analysis-report.component.scss']
})
export class SubjectAnalysisReportComponent implements OnInit {
  subjectAnalysisReport: SubjectAnalysisReport[];
  selectedSubjectId: number;
  selectedUserId: string;
  // @ViewChild('topicDifficultyModalModalRef') private topicDifficultyModalModalRef: ElementRef;
  @ViewChild('testsubjectEditorModal', { static: true })
  editorModal: ModalDirective;

  constructor(private authService: AuthService, private testReportServiceService: TestReportServiceService, private alertService: AlertService, private renderer: Renderer2, private route: ActivatedRoute) { }

  showMessage(msg: string): void {
    this.alertService.showMessage('Overall Report ', msg, MessageSeverity.info);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Try to get the userId from the route parameters (assuming 'id' is the parameter name)
      const userIdFromRoute = params.get('id');

      // Use the userId from the route if available, otherwise fall back to the authService
      const userId = userIdFromRoute || this.authService.currentUser?.id;

      this.selectedUserId = userId;

      if (userId) {
        this.testReportServiceService.getSubjectWiseAnalysisForUser(userId).subscribe({
          next: (data) => {
            this.subjectAnalysisReport = data;
          },
          error: (error) => console.error(error)
        });
      }
    });

  }

  openTopicDifficultyModal(subjectId: number): void {

    this.selectedSubjectId = subjectId;
    console.log('subjectid' + ':' + subjectId);
    console.log('userId' + ':' + this.selectedUserId);

    this.showAttemptModalRefModal()
    // Code to open the modal goes here. This could involve using a ModalService or a local reference to the modal element.
  }

  showAttemptModalRefModal() {
    this.editorModal.show();
    //this.renderer.addClass(this.topicDifficultyModalModalRef.nativeElement, 'show');
    //this.renderer.setStyle(this.topicDifficultyModalModalRef.nativeElement, 'display', 'block');
    //this.renderer.setAttribute(this.topicDifficultyModalModalRef.nativeElement, 'aria-modal', 'true');
    //this.renderer.setAttribute(this.topicDifficultyModalModalRef.nativeElement, 'role', 'dialog');
    //this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  hideAttemptModalRefModal() {
    this.editorModal.hide();
    //this.renderer.removeClass(this.topicDifficultyModalModalRef.nativeElement, 'show');
    //this.renderer.removeStyle(this.topicDifficultyModalModalRef.nativeElement, 'display');
    //this.renderer.removeStyle(document.body, 'overflow');
  }
}
