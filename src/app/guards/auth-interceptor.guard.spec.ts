import { TestBed, async, inject } from '@angular/core/testing';

import { AuthInterceptorGuard } from './auth-interceptor.guard';
import {RouterTestingModule} from "@angular/router/testing";

describe('AuthInterceptorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthInterceptorGuard]
    });
  });

  it('should ...', inject([AuthInterceptorGuard], (guard: AuthInterceptorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
