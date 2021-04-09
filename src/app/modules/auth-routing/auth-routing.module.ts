import {NgModule} from '@angular/core';
import {AuthComponent} from "../../components/auth/auth.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {PreloadSelectedModules} from "./selective-preload-strategy";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {ClientLandingComponent} from "../../components/client-landing/client-landing.component";
import {RadiusRedirectComponent} from "../../components/radius-redirect/radius-redirect.component";
import {RadiusService} from "../../services/radius.service";
import {CarouselComponent} from "../../components/carousel/carousel.component";


/*CuppaLabs*/

export const appRoutes: Routes = [
  {
    path: 'route',
    canActivate: [AuthInterceptorGuard],
    component: RadiusRedirectComponent
  },
  {
    path: 'main',
    component: ClientLandingComponent
  },
  {
    path: 'login/:clientId',
    component: AuthComponent
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
