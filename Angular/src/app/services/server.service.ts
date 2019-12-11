import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';
//import { RequestOptions, ClientResponse, HttpHeaders } from 'http';
//import 'rxjs/add/operator';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept' : 'q=0.8;application/json;q=0.9'
    });

    //this.options = new HttpRequest('http://localhost:5000/api/server', { headers: this.headers });
  }
  options: any;
  headers: HttpHeaders;

  getServers(): Observable<Server[]> {
    return this._http.get<any>('http://localhost:5000/api/server');
    // .catch(this.handleError);
  }

  handleError(error: any) {
    console.log('error');
    const errMsg = (error.message) ? error.message :
    error.status ? '${error.status} - ${error.statusText}' : 'Server error';
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  handleServerMessage(msg: ServerMessage): Observable<ArrayBuffer> {
    const url = 'http://localhost:5000/api/server/' + msg.id;
    return this._http.put(url, msg, this.options);
  }
}
