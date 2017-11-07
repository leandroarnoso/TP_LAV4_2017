import { log } from 'util';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiHttpService {
  headers :Headers = new Headers({'Content-Type': 'application/json'});

  constructor( public http: Http ) { }

  /*public httpGetP ( url: string)
  {
    return this.http
    .get( url )
    .toPromise()
    .then( this.extractData )
    .catch( this.handleError );
  }*/

  public httpPost( url: string, objeto: any )
  {
    return this.http.post(url, objeto, {headers: this.headers})
      .map(this.ExtractData)
      .catch(this.HandleError);
  }

  public httpGetO ( url: string): Observable<Response>
  {
    return this.http.get( url )
      .map(this.ExtractData)
      .catch(this.HandleError);
  }

  private ExtractData ( res :Response )
  {
    return res.json() || {};
  }

  private HandleError ( error :Response | any )
  {
    return error;
  }

}