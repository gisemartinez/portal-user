import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import {PreloadSelectedModules} from "../../modules/auth-routing/selective-preload-strategy";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {RadiusAuthGuard} from "../../guards/radius-auth.guard";
import {RadiusService} from "../../services/radius.service";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {Router, RouterModule} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {BaseRequestOptions, Http, XHRBackend} from "@angular/http";
import {MockBackend} from "@angular/http/testing";

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService:AlertService;

  let mockRouter:any;

  let alertServiceStub = {
    message: String,
    getMessage: Observable.of("pancito Tests")
  };

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [PreloadSelectedModules,
        AuthInterceptorGuard,
        RadiusAuthGuard,
        { provide: AlertService,useValue:alertServiceStub},
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: Router, useValue: mockRouter }
      ],
    });
    alertService = TestBed.get(AlertService);
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
