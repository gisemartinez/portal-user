import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {io} from 'socket.io-client';
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
    return new Observable(observer => {
      this.socket = io(this.url);
      let username = LocalStorageHandler.getUsername()
      this.socket.emit('join', username)
      this.socket.on('validated', (data) => {
        observer.next(data);
      });
      this.socket.on('connected', (data) => {
        console.log('waiting for' + data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }


}
