import {Component, Input, OnInit} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  public show:boolean;

  @Input()
  public mustShowNavBar:boolean;

  @Input()
  public userLogged:boolean;

  constructor() {
  }

  ngOnInit() {
    this.mustShowNavBar=true;
  }

}
