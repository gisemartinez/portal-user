import { NgModule } from '@angular/core';
import {AuthComponent} from "../../components/auth/auth.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthInterceptorGuard} from "../../guards/auth-interceptor.guard";
import {PreloadSelectedModules} from "./selective-preload-strategy";

const appRoutes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: '/route?mac&ipUser&ipRouter',
    component: AuthComponent
  },
  {
    path: '/userLogged',
    canActivate: [AuthInterceptorGuard],
    component: AuthComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [PreloadSelectedModules],
  declarations: []
})
export class AuthRoutingModule { }
