import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {LocalStorageHandler} from "../guards/local-storage-handler";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ClientLandingConf} from "../models/client-landing-conf";


@Injectable()
export class ClientLandingService {

  constructor( private http: HttpClient) {}

  getLandingDataFromClient(): Observable<ClientLandingConf<any>> {
    return this.http.get(environment.server + '/conf/clientLanding/' + LocalStorageHandler.getClient())
      .pipe(map(result => {
          let data = result['data']
          return new ClientLandingConf(data['landingChoices'], data['template_id'])
        })
      )
  };
}
