import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTakerComponent } from './test-taker.component';

describe('TestTakerComponent', () => {
  let component: TestTakerComponent;
  let fixture: ComponentFixture<TestTakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTakerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestTakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
