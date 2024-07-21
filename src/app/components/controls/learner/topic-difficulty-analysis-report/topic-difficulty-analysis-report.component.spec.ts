import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDifficultyAnalysisReportComponent } from './topic-difficulty-analysis-report.component';

describe('TopicDifficultyAnalysisReportComponent', () => {
  let component: TopicDifficultyAnalysisReportComponent;
  let fixture: ComponentFixture<TopicDifficultyAnalysisReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicDifficultyAnalysisReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicDifficultyAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
