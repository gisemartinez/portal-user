import {Component, Input, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Observable} from "rxjs/internal/Observable";
import {SocialLoginService} from "../../services/social-login.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private socialLoginService:SocialLoginService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.socialLoginService.isLoggedIn;
  }

  onLogout(){
    this.socialLoginService.logout();                      // {3}
  }

}
