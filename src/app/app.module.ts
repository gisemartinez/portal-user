import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatBadgeModule} from "@angular/material/badge";
import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTabsModule} from "@angular/material/tabs";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTreeModule} from "@angular/material/tree";
import {OverlayModule} from "@angular/cdk/overlay";
import {PortalModule} from "@angular/cdk/portal";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {CdkStepperModule} from "@angular/cdk/stepper";
import {CdkTableModule} from "@angular/cdk/table";
import {CdkTreeModule} from "@angular/cdk/tree";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
    //MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgbModule,
    OverlayModule,
    PortalModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  providers: [SurveyControlService, AuthService, QuestionService, SocialLoginService],
  bootstrap: [AppComponent]
})


export class AppModule { }
