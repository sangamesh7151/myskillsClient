import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTestReportComponent } from './user-test-report.component';

describe('UserTestReportComponent', () => {
  let component: UserTestReportComponent;
  let fixture: ComponentFixture<UserTestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTestReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
