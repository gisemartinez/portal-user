import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import { TwitterFeedsComponent } from './components/twitter-feeds/twitter-feeds.component';
import {AuthRoutingModule} from "./modules/auth-routing/auth-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    SocialLoginComponent,
    TwitterFeedsComponent,
    AuthRoutingModule
  ],
  imports: [
    BrowserModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
