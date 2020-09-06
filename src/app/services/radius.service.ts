import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {environment} from "../../environments/environment";
import {HttpClient} from '@angular/common/http';
import {LocalStorageHandler} from "../guards/local-storage-handler";

@Injectable()
export class RadiusService {

  private url = environment.server;
  private socket;

  constructor(private http: HttpClient) {
  }


  callRadiusServer(url: string) {
    return this.http.get(url);
  }

  radiusValidation() {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      let username = LocalStorageHandler.getUsername()
      this.socket.emit('join',{email: username})
      this.socket.on('validated', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
      this.socket.on('connected', (data) => {
        console.log(data);
      });
    });
    return observable;
  }



}
