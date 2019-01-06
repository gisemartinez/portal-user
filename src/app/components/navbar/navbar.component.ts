import {Component, Input, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Observable} from "rxjs/internal/Observable";
import {SocialLoginService} from "../../services/social-login.service";
import {LocalStorageHandler} from "../../guards/local-storage-handler";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  username: string;

  constructor(private socialLoginService:SocialLoginService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.socialLoginService.isLoggedIn;
    this.username = LocalStorageHandler.getUsername()
  }

  onLogout(){
    this.socialLoginService.logout();                      // {3}
  }

}
