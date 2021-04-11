import {Component, OnInit} from '@angular/core';
import {RadiusService} from "../../services/radius.service";
import {LocalStorageHandler} from "../../guards/local-storage-handler";
import {ClientLandingService} from "../../services/client-landing.service";
import {AlertService} from "../../services/alert.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-client-landing',
  templateUrl: './client-landing.component.html',
  styleUrls: ['./client-landing.component.css']
})
export class ClientLandingComponent implements OnInit {
  readyToNavigate: boolean;
  template: string;
  templateConfig: {
    leftColumn?: string,
    middleColumn?: string,
    rightColumn?: string,
    iframeURL?: string,
    iframeTitle?: string
  }
  iframeURL?:any

  constructor(private radiusService: RadiusService,
              private landingService: ClientLandingService,
              private alertService: AlertService,
              private sanitizer: DomSanitizer) {
    this.landingService.getLandingDataFromClient().subscribe(
      data => {
        this.template = data.template
        this.templateConfig = data.landingChoices
        this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.landingChoices.iframeURL)
      },
      error => {
        this.alertService.error(JSON.stringify(error));
      }
    )

    this.readyToNavigate = LocalStorageHandler.validateRadiusLoginChecked();

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
