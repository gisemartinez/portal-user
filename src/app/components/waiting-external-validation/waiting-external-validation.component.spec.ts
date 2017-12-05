import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingExternalValidationComponent } from './waiting-external-validation.component';

describe('WaitingExternalValidationComponent', () => {
  let component: WaitingExternalValidationComponent;
  let fixture: ComponentFixture<WaitingExternalValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingExternalValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingExternalValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
