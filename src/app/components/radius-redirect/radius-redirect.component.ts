import { Component, OnInit } from '@angular/core';
import {RadiusSearchparams} from "app/models/router-searchparams";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';


@Component({
  selector: 'app-radius-redirect',
  templateUrl: './radius-redirect.component.html',
  styleUrls: ['./radius-redirect.component.css']
})
export class RadiusRedirectComponent implements OnInit {

  constructor(private route:ActivatedRoute,private location: Location) { }

  ngOnInit() {

    let params = new URLSearchParams(this.location.path(false).split('?')[1]);
    let routerSearchParams = new RadiusSearchparams();
    routerSearchParams.mac = params.get('mac');
    routerSearchParams.ipRadius = params.get('ipRadius');
    routerSearchParams.ip = params.get('ip');
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('token');

    /*routerSearchParams.username = params.get('username');
    routerSearchParams.linkLogin = params.get('link-login');
    routerSearchParams.linkOrig= params.get('link-orig');
    routerSearchParams.error = params.get('error');
    routerSearchParams.macClient = params.get('mac_client');
    routerSearchParams.device = params.get('device');
    routerSearchParams.chapId = params.get('chap-id');
    routerSearchParams.chapChallenge = params.get('chap-challenge');
    routerSearchParams.linkLoginOnly = params.get('link-login-only');
    routerSearchParams.linkOrigEsc = params.get('link-orig-esc');
    routerSearchParams.macEsc = params.get('mac-esc');*/


    console.log(routerSearchParams);
    window.location.href = this.externalUrlToRedirectValidation(routerSearchParams,username,password);
    //window.location.href = 'https://www.google.com'
  }

  private externalUrlToRedirectValidation(radiusParams : RadiusSearchparams, username: string, pass: string) : string {
    return 'http://' + radiusParams.ipRadius + '/login?ip=' + radiusParams.ip +'&username='+ username + '&password=' + pass
  }
}
