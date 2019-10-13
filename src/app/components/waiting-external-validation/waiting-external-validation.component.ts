import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {RadiusService} from "../../services/radius.service";
import {Router} from "@angular/router";
import {fromEvent} from "rxjs/internal/observable/fromEvent";

@Component({
  selector: 'app-waiting-external-validation',
  templateUrl: './waiting-external-validation.component.html',
  styleUrls: ['./waiting-external-validation.component.css']
})
export class WaitingExternalValidationComponent implements OnInit{

  constructor(private radiusService: RadiusService, private router: Router) {
    this.radiusService
      .radiusValidation()
      .subscribe((data: any) => {
        console.log(data);
        localStorage.setItem('isRadiusAccepted', 'true');
        this.router.navigate(['/main']);
      })
  }

  ngOnInit() {
  }


}
