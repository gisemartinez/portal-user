import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingExternalValidationComponent } from './waiting-external-validation.component';
import {RadiusService} from "../../services/radius.service";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";

describe('WaitingExternalValidationComponent', () => {
  let component: WaitingExternalValidationComponent;

  let fixture: ComponentFixture<WaitingExternalValidationComponent>;

  let radiusService: RadiusService;

  let mockRouter:{};

  let radiusValidationSpy: jasmine.Spy;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [WaitingExternalValidationComponent],
      providers: [
        {
          provide: Router, useValue: mockRouter
        },
        RadiusService
      ]
    });

    fixture = TestBed.createComponent(WaitingExternalValidationComponent);
    component = fixture.componentInstance;

    radiusService = fixture.debugElement.injector.get(RadiusService);

    // Setup spy on the `radiusValidation` method
    radiusValidationSpy = spyOn(radiusService, 'radiusValidation')
      .and.returnValue(of(""));
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
