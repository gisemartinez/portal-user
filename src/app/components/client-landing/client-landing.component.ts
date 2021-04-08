import {Component, OnInit} from '@angular/core';
import {RadiusService} from "../../services/radius.service";
import {Router} from "@angular/router";
import {LocalStorageHandler} from "../../guards/local-storage-handler";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-client-landing',
  templateUrl: './client-landing.component.html',
  styleUrls: ['./client-landing.component.css']
})
export class ClientLandingComponent implements OnInit {
  readyToNavigate: boolean;
  template: string;

  constructor(private radiusService: RadiusService, private router: Router, private authService: AuthService) {
    this.readyToNavigate = LocalStorageHandler.validateRadiusLoginChecked();
    this.template = LocalStorageHandler.getTemplate()

    this.radiusService
      .radiusValidation()
      .subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('isRadiusAccepted', 'true');
        this.readyToNavigate = true;
      })
  }

  ngOnInit() {
  }


}
