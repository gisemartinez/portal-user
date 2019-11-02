import {Component, OnInit} from '@angular/core';
import {RadiusSearchparams} from "app/models/router-searchparams";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
import {RadiusService} from "../../services/radius.service";
import {SocialLoginResponse} from "../../models/social-login-response";
import * as config from "../../../../server/config.js";
import {LocalStorageHandler} from "../../guards/local-storage-handler";


@Component({
  selector: 'app-radius-redirect',
  templateUrl: './radius-redirect.component.html',
  styleUrls: ['./radius-redirect.component.css']
})
export class RadiusRedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
              private location: Location,
              private radiusService: RadiusService) {

  }

  ngOnInit() {
    let params = new URLSearchParams(this.location.path(false).split('?')[1]);
    LocalStorageHandler.setClient(params.get('client'));
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('token');

    let radiusSearchParams = new RadiusSearchparams();
    radiusSearchParams.mac = params.get('mac');
    radiusSearchParams.ip = params.get('ip');
    radiusSearchParams.linkLogin = params.get('link-login');
    radiusSearchParams.linkOrig = params.get('link-orig');
    radiusSearchParams.error = params.get('error');
    radiusSearchParams.macClient = params.get('mac_client');
    radiusSearchParams.device = params.get('device');
    radiusSearchParams.chapId = params.get('chap-id');
    radiusSearchParams.chapChallenge = params.get('chap-challenge');
    radiusSearchParams.linkLoginOnly = params.get('link-login-only');
    radiusSearchParams.linkOrigEsc = params.get('link-orig-esc');
    radiusSearchParams.macEsc = params.get('mac-esc');

    let externalUrl = this.externalUrlToRedirectValidation(radiusSearchParams, username, password);
    this.radiusService.callRadiusServer(externalUrl).subscribe((data: SocialLoginResponse) => {
        this.router.navigate(['/waiting']);
      }, error => {
        console.log(error)
      }
    );
  }

  private externalUrlToRedirectValidation(radiusParams: RadiusSearchparams, username: string, pass: string): string {
    return config['radiusServer'] + '?ip=' + radiusParams.ip + '&username=' + username + '&password=' + username + '&dst=http://www.frd.utn.edu.ar/'
  }
}
