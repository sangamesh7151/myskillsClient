import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInprogressReportComponentComponent } from './test-inprogress-report.component.component';

describe('TestInprogressReportComponentComponent', () => {
  let component: TestInprogressReportComponentComponent;
  let fixture: ComponentFixture<TestInprogressReportComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestInprogressReportComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestInprogressReportComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
