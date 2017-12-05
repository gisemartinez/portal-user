import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiusRedirectComponent } from './radius-redirect.component';

describe('RadiusRedirectComponent', () => {
  let component: RadiusRedirectComponent;
  let fixture: ComponentFixture<RadiusRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiusRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiusRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
