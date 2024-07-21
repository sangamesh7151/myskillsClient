import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLearnerComponent } from './dashboard.learner.component';

describe('DashboardLernerComponent', () => {
  let component: DashboardLearnerComponent;
  let fixture: ComponentFixture<DashboardLearnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLearnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
