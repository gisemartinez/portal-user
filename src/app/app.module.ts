import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {AppComponent} from './app.component';
import {SocialLoginComponent} from './components/social-login/social-login.component';
import {AuthRoutingModule} from "./modules/auth-routing/auth-routing.module";
import {AuthComponent} from "./components/auth/auth.component";
import {WaitingExternalValidationComponent} from "./components/waiting-external-validation/waiting-external-validation.component";
import {RadiusRedirectComponent} from "./components/radius-redirect/radius-redirect.component";
import {HttpClientModule} from "@angular/common/http";
import {CarouselComponent} from "./components/carousel/carousel.component";
import {SurveyComponent} from "./components/survey/survey.component";
import {DynamicFormQuestionComponent} from "./components/dynamic-form-question/dynamic-form-question.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SurveyControlService} from "./services/survey-control-service";
import {AuthService} from "./services/auth.service";
import {QuestionService} from "./services/question.service";
import {SocialLoginService} from "./services/social-login.service";
import {AlertComponent} from "./components/alert/alert.component";

@NgModule({
  declarations: [
    AppComponent,
    SocialLoginComponent,
    AuthComponent,
    RadiusRedirectComponent,
    WaitingExternalValidationComponent,
    CarouselComponent,
    SurveyComponent,
    DynamicFormQuestionComponent,
    AlertComponent
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
