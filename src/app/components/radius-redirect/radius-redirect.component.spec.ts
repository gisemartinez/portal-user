import {async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed} from "@angular/core/testing";

import {RadiusRedirectComponent} from "./radius-redirect.component";

import {ActivatedRoute, Router} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {of} from "rxjs";
import {SpyLocation} from "@angular/common/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from "@angular/common";


describe('RadiusRedirectComponent', () => {
  let component: RadiusRedirectComponent;
  let fixture: ComponentFixture<RadiusRedirectComponent>;
  let mockRouter :any;
  let location: SpyLocation;
  let activatedRoute: ActivatedRoute;
  let route: Router;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      declarations: [RadiusRedirectComponent],
      imports: [RouterTestingModule],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        {provide: Router, useValue: mockRouter},
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 123})
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

    });

    activatedRoute = TestBed.get(ActivatedRoute);
    route = TestBed.get(Router);
    fixture = TestBed.createComponent(RadiusRedirectComponent);
    component = fixture.componentInstance;
    const injector = fixture.debugElement.injector;
    location = injector.get(Location) as SpyLocation;
    spyOn(location, 'path').and.returnValue('?link-login=trotta');
    //route.initialNavigation();
    fixture.detectChanges();
  }));



  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should redirect', fakeAsync(() => {
    component.ngOnInit();
    expect(location.path()).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/router']);
  }));


});
