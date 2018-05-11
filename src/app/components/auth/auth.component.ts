import {Component, OnInit} from "@angular/core";
import {authServerBaseUrl} from "../../constants/misc.const";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  navIsVisible:boolean;

  constructor(){
    this.navIsVisible = false;
  }

  ngOnInit() {
  }


  public config = {
    "linkedin":{
      "authEndpoint": authServerBaseUrl + "/auth/linkedin"
    },
    "facebook":{
      "authEndpoint": authServerBaseUrl+"/auth/facebook"
    },
    "google":{
      "authEndpoint": authServerBaseUrl+"/auth/google"
    }
  }

}
