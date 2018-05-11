import { Component, OnInit } from '@angular/core';
import {RadiusSearchparams} from "app/models/router-searchparams";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';


@Component({
  selector: 'app-radius-redirect',
  templateUrl: './radius-redirect.component.html',
  styleUrls: ['./radius-redirect.component.css']
})
export class RadiusRedirectComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router: Router,private location: Location) { }

  ngOnInit() {

    let params = new URLSearchParams(this.location.path(false).split('?')[1]);
    let routerSearchParams = new RadiusSearchparams();
    routerSearchParams.mac = params.get('mac');
    routerSearchParams.ip = params.get('ip');
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('token');

    routerSearchParams.linkLogin = params.get('link-login');
    routerSearchParams.linkOrig= params.get('link-orig');
    routerSearchParams.error = params.get('error');
    routerSearchParams.macClient = params.get('mac_client');
    routerSearchParams.device = params.get('device');
    routerSearchParams.chapId = params.get('chap-id');
    routerSearchParams.chapChallenge = params.get('chap-challenge');
    routerSearchParams.linkLoginOnly = params.get('link-login-only');
    routerSearchParams.linkOrigEsc = params.get('link-orig-esc');
    routerSearchParams.macEsc = params.get('mac-esc');


    console.log(routerSearchParams);
    let externalUrl = this.externalUrlToRedirectValidation(routerSearchParams,username,password);
    window.location.href = externalUrl;

    //this.router.navigate([externalUrl],{relativeTo: this.route});
  }

  private externalUrlToRedirectValidation(radiusParams : RadiusSearchparams, username: string, pass: string) : string {
    return  radiusParams.linkLogin   + '&ip=' + radiusParams.ip +'&username='+ username + '&password=' + username + '&dst=http://www.frd.utn.edu.ar/'
  }
}
