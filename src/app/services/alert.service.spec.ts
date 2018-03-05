import { TestBed, inject } from '@angular/core/testing';

import { AlertService } from './alert.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('AlertService', () => {
  let mockRouter:any;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      providers: [AlertService]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {

    expect(service).toBeTruthy();
  }));
});
