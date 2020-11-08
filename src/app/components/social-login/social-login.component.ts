import {Component, Input, OnInit} from '@angular/core';
import {SocialLoginService} from "../../services/social-login.service";
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from "@angular/material/icon";


@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  ngOnInit(): void {}

  @Input()
  authConfig: any;


  portalClient: String;

  loginEntities: {
    google: {
      color: string,
      activated: boolean
    },
    facebook: {
      color: string,
      activated: boolean
    },
    instagram: {
      color: string,
      activated: boolean
    },
    pinterest: {
      color: string,
      activated: boolean
    },
    twitter: {
      color: string,
      activated: boolean
    }
  };

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public socialAuthService:SocialLoginService) {
    iconRegistry
      .addSvgIcon('fb',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/facebook_icon.svg'))
      .addSvgIcon('google',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/google_plus_icon.svg'))
      .addSvgIcon('instagram',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/instagram_icon.svg'))
      .addSvgIcon('pinterest',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/pinterest_icon.svg'))
      .addSvgIcon('twitter',
        sanitizer.bypassSecurityTrustResourceUrl('/assets/twitter_icon.svg'));
    //TODO: Se debe cargar dinamicamente, consultando al Admin
    this.portalClient = "Super Shopping Mall";
    this.loginEntities = {
      'google' : {
        color: 'primary',
        activated: true
      },
      'facebook' : {
        color: 'accent',
        activated: true
      },
      'instagram' : {
        color: 'accent',
        activated: false
      },
      'pinterest' : {
        color: 'accent',
        activated: true
      },
      'twitter' : {
        color: 'accent',
        activated: true
      }
    }

  }

  loginWith(entity){
    this.socialAuthService.auth(entity,this.authConfig)
  }
}
