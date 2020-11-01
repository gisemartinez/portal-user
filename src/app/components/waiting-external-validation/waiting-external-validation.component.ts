import {Component, OnInit} from '@angular/core';
import {RadiusService} from "../../services/radius.service";
import {Router} from "@angular/router";
import {LocalStorageHandler} from "../../guards/local-storage-handler";

@Component({
  selector: 'app-waiting-external-validation',
  templateUrl: './waiting-external-validation.component.html',
  styleUrls: ['./waiting-external-validation.component.css']
})
export class WaitingExternalValidationComponent implements OnInit{
  readyToNavigate:boolean;

  constructor(private radiusService: RadiusService, private router: Router) {
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
