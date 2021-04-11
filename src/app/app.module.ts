import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {SocialLoginComponent} from './components/social-login/social-login.component';
import {AuthRoutingModule} from "./modules/auth-routing/auth-routing.module";
import {AuthComponent} from "./components/auth/auth.component";
import {ClientLandingComponent} from "./components/client-landing/client-landing.component";
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
import {ScrollingModule} from "@angular/cdk/scrolling";
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CdkTableModule} from "@angular/cdk/table";
import {CdkTreeModule} from "@angular/cdk/tree";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {ClientLandingService} from "./services/client-landing.service";

@NgModule({
  declarations: [
    AppComponent,
    SocialLoginComponent,
    AuthComponent,
    RadiusRedirectComponent,
    ClientLandingComponent,
    CarouselComponent,
    SurveyComponent,
    DynamicFormQuestionComponent,
    AlertComponent
  ],
  imports: [
    AuthRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    NgbModule,
    OverlayModule,
    PortalModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  providers: [SurveyControlService, AuthService, QuestionService, SocialLoginService, ClientLandingService,
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}
