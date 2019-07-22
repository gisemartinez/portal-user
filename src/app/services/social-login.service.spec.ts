import {TestBed, async, getTestBed, inject, ComponentFixtureAutoDetect} from '@angular/core/testing';

import { SocialLoginService } from './social-login.service';
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from "../material.module";

import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

import {AlertService} from "./alert.service";
import {HttpBackend, HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpXhrBackend} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";


describe('SocialLoginService', () => {
  let mockRouter:any;
  let backend: HttpClientTestingModule;
  let socialLoginService: SocialLoginService;
  let locationMock: Location;
  let fixture;
  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    locationMock = jasmine.createSpyObj('Location', ['get']);
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        MaterialModule,
        HttpClientModule,
        RouterTestingModule
      ],

      providers: [
        SocialLoginService,
        AlertService,
        {provide: Location, useValue: locationMock},
        //{ provide: Router, useValue: mockRouter },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {
          provide: HttpClientTestingModule,
          deps: [ HttpXhrBackend ],
          useFactory:
            (backend: HttpXhrBackend) => {
              return new HttpClient(backend);
            }
        }
        ]
    }).compileComponents();

    const testbed = getTestBed();
    backend = testbed.get(HttpXhrBackend);
    socialLoginService = testbed.get(SocialLoginService);


  }));

  it('should be created', inject([SocialLoginService], (service: SocialLoginService) => {
    expect(service).toBeTruthy();
  }));
});
