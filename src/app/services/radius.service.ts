import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import * as io from 'socket.io-client';

@Injectable()
export class RadiusService {

  private url = 'http://localhost:3000';
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
