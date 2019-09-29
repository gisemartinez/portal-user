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
    let radiusSearchParams = new RadiusSearchparams();
    radiusSearchParams.mac = params.get('mac');
    radiusSearchParams.ip = params.get('ip');
    let username = localStorage.getItem('username');
    let password = localStorage.getItem('token');

    radiusSearchParams.linkLogin = params.get('link-login');
    radiusSearchParams.linkOrig= params.get('link-orig');
    radiusSearchParams.error = params.get('error');
    radiusSearchParams.macClient = params.get('mac_client');
    radiusSearchParams.device = params.get('device');
    radiusSearchParams.chapId = params.get('chap-id');
    radiusSearchParams.chapChallenge = params.get('chap-challenge');
    radiusSearchParams.linkLoginOnly = params.get('link-login-only');
    radiusSearchParams.linkOrigEsc = params.get('link-orig-esc');
    radiusSearchParams.macEsc = params.get('mac-esc');


    console.log(radiusSearchParams);
    let externalUrl = this.externalUrlToRedirectValidation(radiusSearchParams,username,password);
    window.location.href = externalUrl;

    //this.router.navigate([externalUrl],{relativeTo: this.route});
  }

  private externalUrlToRedirectValidation(radiusParams : RadiusSearchparams, username: string, pass: string) : string {
    return  radiusParams.linkLogin   + '&ip=' + radiusParams.ip +'&username='+ username + '&password=' + username + '&dst=http://www.frd.utn.edu.ar/'
  }
}
