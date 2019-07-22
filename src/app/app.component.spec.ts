import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {SocialLoginComponent} from "./components/social-login/social-login.component";
import {AuthComponent} from "./components/auth/auth.component";
import {TwitterFeedsComponent} from "./components/twitter-feeds/twitter-feeds.component";
import {ConfiguredMainComponent} from "./components/configured-main/configured-main.component";
import {RadiusRedirectComponent} from "./components/radius-redirect/radius-redirect.component";
import {WaitingExternalValidationComponent} from "./components/waiting-external-validation/waiting-external-validation.component";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from "./material.module";
import {AuthRoutingModule} from "./modules/auth-routing/auth-routing.module";
import {HttpClientModule} from '@angular/common/http'
import {APP_BASE_HREF} from "@angular/common";
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SocialLoginComponent,
        AuthComponent,
        TwitterFeedsComponent,
        ConfiguredMainComponent,
        RadiusRedirectComponent,
        WaitingExternalValidationComponent
      ],
      imports: [
        BrowserModule,
        MaterialModule,
        AuthRoutingModule,
        HttpClientModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Portal User'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Portal User');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-content')).not.toBe(null);
  }));
});
