import {async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed} from "@angular/core/testing";

import {RadiusRedirectComponent} from "./radius-redirect.component";

import {ActivatedRoute, Router} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {SpyLocation} from "@angular/common/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";


describe('RadiusRedirectComponent', () => {
  let component: RadiusRedirectComponent;
  let fixture: ComponentFixture<RadiusRedirectComponent>;
  let mockRouter :any;
  let location: SpyLocation;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    //mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [RadiusRedirectComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
       // {provide: Router, useValue: mockRouter},
       // {provide: Location, useClass: SpyLocation},
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: 123})
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    });
   // location = TestBed.get(Location);
    activatedRoute = TestBed.get(ActivatedRoute);
    //fixture = TestBed.createComponent(RadiusRedirectComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  }));

  //beforeEach(() => {
  //  fixture = TestBed.createComponent(RadiusRedirectComponent);
   // component = fixture.componentInstance;
    //fixture.detectChanges();

    //const injector = fixture.debugElement.injector;
    //location = (injector.get(Location) as SpyLocation);


  //});

  it('should create', fakeAsync(() => {
    createComponent();
    expect(component).toBeTruthy();
  }));

  function createComponent() {
    fixture = TestBed.createComponent(RadiusRedirectComponent);
    component = fixture.componentInstance;

    const injector = fixture.debugElement.injector;
    location = injector.get(Location) as SpyLocation;
    mockRouter = injector.get(Router);
    mockRouter.initialNavigation();
    fixture.detectChanges();
  }
});
