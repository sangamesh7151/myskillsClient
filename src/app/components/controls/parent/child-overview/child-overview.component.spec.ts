import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildOverviewComponent } from './child-overview.component';

describe('ChildOverviewComponent', () => {
  let component: ChildOverviewComponent;
  let fixture: ComponentFixture<ChildOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
