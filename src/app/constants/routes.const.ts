import {Routes} from "@angular/router";
import {AuthComponent} from "../components/auth/auth.component";
import {AuthInterceptorGuard} from "../guards/auth-interceptor.guard";



export const appRoutes: Routes = [
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
