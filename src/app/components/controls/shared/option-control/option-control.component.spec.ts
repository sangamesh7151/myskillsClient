import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionControlComponent } from './option-control.component';

describe('OptionControlComponent', () => {
  let component: OptionControlComponent;
  let fixture: ComponentFixture<OptionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
