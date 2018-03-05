import {TestBed, async, getTestBed, inject, ComponentFixtureAutoDetect} from '@angular/core/testing';

import { SocialLoginService } from './social-login.service';
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from "../material.module";

import {BaseRequestOptions, Http, HttpModule, XHRBackend,Response,ResponseOptions} from "@angular/http";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";

import {AlertService} from "./alert.service";


describe('SocialLoginService', () => {
  let mockRouter:any;
  let backend: MockBackend;
  let socialLoginService: SocialLoginService;
  let location: Location;
  let fixture;
  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    location = jasmine.createSpyObj('Location', ['get']);
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        MaterialModule,
        HttpModule,
        RouterTestingModule
      ],

      providers: [
        SocialLoginService,
        MockBackend,
        BaseRequestOptions,
        AlertService,
        {provide: Location, useValue: location},
        //{ provide: Router, useValue: mockRouter },
        { provide: ComponentFixtureAutoDetect, useValue: true },
        {
          provide: Http,
          deps: [ MockBackend, BaseRequestOptions ],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
        }
        ]
    }).compileComponents();

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    socialLoginService = testbed.get(SocialLoginService);


  }));

  it('should be created', inject([SocialLoginService], (service: SocialLoginService) => {
    expect(service).toBeTruthy();
  }));
});
