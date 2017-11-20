import {Component, Input, OnInit} from '@angular/core';
import {SocialLoginService} from "../../services/social-login.service";

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

  constructor(public socialAuthService:SocialLoginService) {
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

}
