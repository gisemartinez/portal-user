import { NgModule } from '@angular/core';
import {AuthComponent} from "../../components/auth/auth.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {PreloadSelectedModules} from "./selective-preload-strategy";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {AppComponent} from "../../app.component";
import {ConfiguredMainComponent} from "../../components/configured-main/configured-main.component";
import {WaitingExternalValidationComponent} from "../../components/waiting-external-validation/waiting-external-validation.component";
import {RadiusRedirectComponent} from "../../components/radius-redirect/radius-redirect.component";
import {RadiusAuthGuard} from "../../guards/radius-auth.guard";
import {RadiusService} from "../../services/radius.service";


/*CuppaLabs*/

const appRoutes: Routes = [
  {
    path: 'route',
    canActivate: [AuthInterceptorGuard],
    component: RadiusRedirectComponent
  },
  {
    path: 'main',
    canActivate: [AuthInterceptorGuard,RadiusAuthGuard],
    component: ConfiguredMainComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'waiting',
    component: WaitingExternalValidationComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [PreloadSelectedModules,
    AuthInterceptorGuard,
    RadiusService,
    SocialLoginService,
    AlertService
  ],
  declarations: []
})
export class AuthRoutingModule { }
