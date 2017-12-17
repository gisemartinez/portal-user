import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";

@Injectable()
export class RadiusService {

  private url = environment.server;
  private socket;

  radiusValidation() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('validated', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


}
