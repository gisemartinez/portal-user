import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import {PreloadSelectedModules} from "../../modules/auth-routing/selective-preload-strategy";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {RadiusAuthGuard} from "../../guards/radius-auth.guard";
import {RadiusService} from "../../services/radius.service";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {Router, RouterModule} from "@angular/router";
import {Observable} from "rxjs/Observable";

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let mockRouter:any;
  let alertServiceStub = {
    getMessage: jasmine.createSpy('getMessage').and.callFake(() =>
      '')
  };

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [PreloadSelectedModules,
        AuthInterceptorGuard,
        RadiusAuthGuard,
        AlertService,
       // {provide: AlertService, useValue: alertServiceStub},
        { provide: Router, useValue: mockRouter }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
