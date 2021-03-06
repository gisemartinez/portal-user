import { Component } from '@angular/core';
import {LocalStorageHandler} from "./guards/local-storage-handler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = LocalStorageHandler.getClient() || 'Portal Access not found';
  navIsVisible=true;
}
