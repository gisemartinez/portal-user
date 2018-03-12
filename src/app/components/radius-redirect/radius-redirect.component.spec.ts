import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import { RadiusRedirectComponent } from './radius-redirect.component';
import {PreloadSelectedModules} from "../../modules/auth-routing/selective-preload-strategy";
import {RadiusAuthGuard} from "app/guards/radius-auth.guard";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {RadiusService} from "../../services/radius.service";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {RouterTestingModule} from "@angular/router/testing";

describe('RadiusRedirectComponent', () => {
  let component: RadiusRedirectComponent;
  let fixture: ComponentFixture<RadiusRedirectComponent>;
  let mockRouter :any;
  let locationMock: Location;


  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    locationMock = jasmine.createSpyObj('Location', ['path']);
    TestBed.configureTestingModule({
      declarations: [RadiusRedirectComponent],
      //imports: [RouterTestingModule],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: Router, useValue: mockRouter},
        {provide: Location, useValue: locationMock},
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: 123})
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    }).compileComponents();
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
