import {Component, Input, OnInit} from '@angular/core';
import {SocialLoginService} from "../../services/social-login.service";
import {MatIconRegistry} from "@angular/material";
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  ngOnInit(): void {}

  @Input()
  authConfig: any;

  portalClient = "Tienda León";

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
    console.log(socialAuthService);
  }

  linkedinLogin() {
    this.socialAuthService.auth('linkedin',this.authConfig);
  }
  facebookLogin(){
    this.socialAuthService.auth('facebook',this.authConfig);
  }
  googleLogin(){
    this.socialAuthService.auth('google',this.authConfig);
  }
  logout(){
    this.socialAuthService.logout();
  }

}
