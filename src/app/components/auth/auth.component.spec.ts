import {async, ComponentFixture, ComponentFixtureAutoDetect, getTestBed, TestBed} from "@angular/core/testing";

import {AuthComponent} from "./auth.component";
import {PreloadSelectedModules} from "../../modules/auth-routing/selective-preload-strategy";
import {AlertService} from "../../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {ActivatedRouteStub} from "../../testing/mocks/activated-route-stub";


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockRouter: any;
  let locationProvider: any;
  let locationMock: Location;

  let alertServiceStub = {
    message: String,
    getMessage: Observable.of("pancito Tests")
  };

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    locationMock = jasmine.createSpyObj('Location', ['get']);

    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [PreloadSelectedModules,
        {provide: ComponentFixtureAutoDetect, useValue: true}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

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
