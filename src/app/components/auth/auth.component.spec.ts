import {async, ComponentFixture, ComponentFixtureAutoDetect, getTestBed, TestBed} from "@angular/core/testing";

import {AuthComponent} from "./auth.component";
import {PreloadSelectedModules} from "../../modules/auth-routing/selective-preload-strategy";
import {ActivatedRoute, Router} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {Observable} from "rxjs/Observable";


describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockRouter: any;


  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

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
