import { NgModule } from '@angular/core';
import {AuthComponent} from "../../components/auth/auth.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {PreloadSelectedModules} from "./selective-preload-strategy";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {AppComponent} from "../../app.component";


/*CuppaLabs*/

const appRoutes: Routes = [
  {
    path: 'route/:mac/:ipUser/:ipRouter',
    component: AuthComponent
  },
  {
    path: 'userLogged',
    canActivate: [AuthInterceptorGuard],
    component: AuthComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [PreloadSelectedModules,
    SocialLoginService,
    AlertService
  ],
  declarations: []
})
export class AuthRoutingModule { }
