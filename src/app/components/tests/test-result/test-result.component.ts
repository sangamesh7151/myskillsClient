import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultQuestion } from '../../../models/testResult/result-question.model';
import { AuthService } from '../../../services/auth.service';
import { TestResultService } from '../../../services/testResult/test-result.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  @Input() testId: number;
  @Input() attemptId: number;
  @Input() currentUser: string;
  resultQuestion: ResultQuestion[] = [];

  constructor(private route: ActivatedRoute, private testResultService: TestResultService, private authService: AuthService) { }

  ngOnInit() {
    // Retrieve the route parameters
    //this.route.params.subscribe(params => {
    //  this.testId = 2005; //+params['testId'];
    //  this.attemptId = 1;;// +params['attemptId'];
    //  // Now you can use testId and attemptId to load the test result data
    //  this.loadTestResultData();
    //});
    this.loadTestResultData();
  }

  loadTestResultData() {
    // Use this.testId and this.attemptId to load your data
    // this.testId = 2005;
    // this.attemptId = 1;
    if (this.testId && this.attemptId) {
      this.testResultService.getTestResult(this.testId, this.attemptId, this.currentUser).subscribe(result => {
        // Handle the result
        this.resultQuestion = result;
      });
    }
  }

}
