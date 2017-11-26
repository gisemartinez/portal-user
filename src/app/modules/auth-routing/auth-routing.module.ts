import { NgModule } from '@angular/core';
import {AuthComponent} from "../../components/auth/auth.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {PreloadSelectedModules} from "./selective-preload-strategy";
import {SocialLoginService} from "../../services/social-login.service";
import {AlertService} from "../../services/alert.service";
import {AppComponent} from "../../app.component";
import {ConfiguredMainComponent} from "../../components/configured-main/configured-main.component";


/*CuppaLabs*/

const appRoutes: Routes = [
  {
    path: 'route',
    component: AuthComponent
  },
  {
    path: 'userLogged',
    canActivate: [AuthInterceptorGuard],
    component: AuthComponent
  },
  {
    path: 'admin',
    component: ConfiguredMainComponent,
    canActivate: [SocialLoginService]
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
