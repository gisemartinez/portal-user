import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import {PreloadSelectedModules} from "../../modules/auth-routing/selective-preload-strategy";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {RadiusAuthGuard} from "../../guards/radius-auth.guard";
import {RadiusService} from "../../services/radius.service";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {Router, RouterModule} from "@angular/router";
import {of} from "rxjs";
import {HttpRequest, HttpClient, HttpXhrBackend} from "@angular/common/http";
import {HttpTestingController} from "@angular/common/http/testing";

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertService:AlertService;

  let mockRouter:any;

  let alertServiceStub = {
    message: String,
    getMessage: of("pancito Tests")
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
