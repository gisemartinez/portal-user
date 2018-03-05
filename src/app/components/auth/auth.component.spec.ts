import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {PreloadSelectedModules} from "../../modules/auth-routing/selective-preload-strategy";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {RadiusAuthGuard} from "../../guards/radius-auth.guard";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {RadiusService} from "../../services/radius.service";
import {Router} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA} from "@angular/core";


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockRouter:any

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
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
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
