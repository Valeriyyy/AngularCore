import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SalesDataService {

  constructor(private _http: HttpClient) { }

  getOrders(pageIndex: number, pageSize: number) {
    return this._http.get('http://localhost:5000/api/order/' + pageIndex + '/' + pageSize);
  }

  getOrdersByCustomer(n: number) {
    return this._http.get('http//localhost:5000/api/order/ByCustomer/' + n);
  }

  getOrderByState() {
    return this._http.get('http//localhost:5000/api/order/bystate/');
  }


}
