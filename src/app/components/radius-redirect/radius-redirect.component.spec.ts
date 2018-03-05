import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiusRedirectComponent } from './radius-redirect.component';
import {PreloadSelectedModules} from "../../modules/auth-routing/selective-preload-strategy";
import {RadiusAuthGuard} from "app/guards/radius-auth.guard";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {RadiusService} from "../../services/radius.service";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('RadiusRedirectComponent', () => {
  let component: RadiusRedirectComponent;
  let fixture: ComponentFixture<RadiusRedirectComponent>;
  let mockRouter :any;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ RadiusRedirectComponent ],
      providers: [PreloadSelectedModules,
        AuthInterceptorGuard,
        RadiusAuthGuard,
        RadiusService,
        SocialLoginService,
        AlertService,
        { provide: Router, useValue: mockRouter }
      ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]

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
