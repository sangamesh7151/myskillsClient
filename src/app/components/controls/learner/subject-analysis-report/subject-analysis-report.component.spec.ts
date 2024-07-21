import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAnalysisReportComponent } from './subject-analysis-report.component';

describe('SubjectAnalysisReportComponent', () => {
  let component: SubjectAnalysisReportComponent;
  let fixture: ComponentFixture<SubjectAnalysisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectAnalysisReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
