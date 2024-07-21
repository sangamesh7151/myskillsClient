import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubjectCoverageStatsComponent } from './user-subject-coverage-stats.component';

describe('UserSubjectCoverageStatsComponent', () => {
  let component: UserSubjectCoverageStatsComponent;
  let fixture: ComponentFixture<UserSubjectCoverageStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSubjectCoverageStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSubjectCoverageStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
