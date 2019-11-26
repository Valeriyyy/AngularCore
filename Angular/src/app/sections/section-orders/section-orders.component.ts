import { Component, OnInit } from '@angular/core';
import { Order } from '../../shared/order';
import { SalesDataService } from '../../services/sales-data.service';
import { getLocaleExtraDayPeriods } from '@angular/common';

@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor(private _salesData: SalesDataService) { }

  orders: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this._salesData.getOrders(this.page, this.limit)
    .subscribe( res => {
      console.log('REsult from getOrders: ' , res)
      this.orders = res['page']['data'];
      this.total = res['page'].total;
      this.loading = false;
    });
  }

  goToPrevious(): void {
    console.log('Previous Button clicked');
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    console.log('Next button pressed');
    this.page++;
    this.getOrders();
  }

  goToPage(n: number) {
    this.page = n;
    this.getOrders();
  }

}

/*orders: Order[] = [
  {id: 1, customer:
    {id: 1, name: 'MAIN ST BAKERY', state:'CO', email:'faget@gamil.com'},
    total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2018, 2, 1) },
  {id: 2, customer:
    {id: 1, name: 'MAIN ST BAKERY', state:'CO', email:'faget@gamil.com'},
    total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2018, 2, 1) },
  {id: 3, customer:
    {id: 1, name: 'MAIN ST BAKERY', state:'CO', email:'faget@gamil.com'},
    total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2018, 2, 1) },
  {id: 4, customer:
    {id: 1, name: 'MAIN ST BAKERY', state:'CO', email:'faget@gamil.com'},
    total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2018, 2, 1) },
  {id: 5, customer:
    {id: 1, name: 'MAIN ST BAKERY', state:'CO', email:'faget@gamil.com'},
    total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2018, 2, 1) },
];*/
