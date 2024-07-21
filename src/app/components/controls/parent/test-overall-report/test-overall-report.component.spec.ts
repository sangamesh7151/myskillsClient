import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOverallReportComponent } from './test-overall-report.component';

describe('TestOverallReportComponent', () => {
  let component: TestOverallReportComponent;
  let fixture: ComponentFixture<TestOverallReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOverallReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOverallReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
