import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { TwitterFeedsComponent } from './components/twitter-feeds/twitter-feeds.component';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AuthRoutingModule} from "./modules/auth-routing/auth-routing.module";
import {AuthComponent} from "./components/auth/auth.component";
import {ConfiguredMainComponent} from "./components/configured-main/configured-main.component";
import {WaitingExternalValidationComponent} from "./components/waiting-external-validation/waiting-external-validation.component";
import {RadiusRedirectComponent} from "./components/radius-redirect/radius-redirect.component";
import {HttpClientModule} from "@angular/common/http";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {CarouselComponent} from "./components/carousel/carousel.component";
import {SurveyComponent} from "./components/survey/survey.component";
import {DynamicFormQuestionComponent} from "./components/dynamic-form-question/dynamic-form-question.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {PlainSurveyComponent} from "./components/plain-survey/plain-survey.component";
import {SurveyControlService} from "./services/survey-control-service";
import {AuthService} from "./services/auth.service";
import {QuestionService} from "./services/question.service";
import {SocialLoginService} from "./services/social-login.service";

@NgModule({
  declarations: [
    AppComponent,
    SocialLoginComponent,
    AuthComponent,
    TwitterFeedsComponent,
    NavbarComponent,
    SidenavComponent,
    ConfiguredMainComponent,
    RadiusRedirectComponent,
    WaitingExternalValidationComponent,
    CarouselComponent,
    SurveyComponent,
    DynamicFormQuestionComponent,
    PlainSurveyComponent
  ],
  imports: [
    BrowserModule,
    AuthRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [SurveyControlService, AuthService, QuestionService, SocialLoginService],
  bootstrap: [AppComponent]
})



export class AppModule { }
