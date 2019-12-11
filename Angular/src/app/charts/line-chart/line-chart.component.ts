import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';
import { map } from 'rxjs-compat/operators/map';


/*const LINE_CHART_SAMPLE_DATA: any[] = [
  { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment anal' },
  { data: [12, 18, 26, 13, 28, 26], label: 'image recognition' },
  { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting' },
];
const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
*/
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private _salesDataService: SalesDataService) { }
  topCustomers: any[];
  allOrders: any[];

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartLegend: true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit() {
    this._salesDataService.getOrders(1, 100).subscribe(res => {
      //console.log('getorders: ', res);
      this.allOrders = res['page']['data'];
      console.log(this.allOrders);
      this._salesDataService.getOrdersByCustomer(3).subscribe(cus => {
        this.topCustomers = cus.map(x => x['name']);
        console.log('names', this.topCustomers);
        //result is the accumulator and i is the current value
        const allChartData = this.topCustomers.reduce((result, i) => {
          //pushes data onto accumulator
          result.push(this.getChartData(this.allOrders, i));
          return result;
       }, []);

       let dates = allChartData.map(x => x['data']).reduce((a, i) => {
          a.push(i.map( o => new Date(a[0])));
          return a;
       }, []);

       console.log('dates: ', dates);
       dates = [].concat.apply([], dates);

       const r = this.getCustomerOrdersByDates(allChartData, dates)['data'];
       this.lineChartLabels = r[0]['orders'].map(o => o['date']);
       this.lineChartData = [
         { 'data': r[0]['orders'].map(x => x['total']), 'label': r[0]['customer']},
         { 'data': r[1]['orders'].map(x => x['total']), 'label': r[1]['customer']},
         { 'data': r[2]['orders'].map(x => x['total']), 'label': r[2]['customer']}
       ];

      });
    });
  }

  getChartData(allOrders: any, name: string) {
    const customerOrders = allOrders.filter(o => o.customer.name === name);
    console.log('name: ', name, 'customerOrders:', customerOrders);
    const formattedOrders = customerOrders.reduce((r, e ) => {
      r.push([e.placed, e.total]);
      return r;
    }, []);
    console.log('formattedorders: ', formattedOrders);
    const result = { customer: name, data: formattedOrders };
    return result;
  }

  getCustomerOrdersByDates(orders: any, dates: any) {
    // for each customer => for each date =>
    //{ data: [{'customer': 'asd', 'orders: [{'date': 'somedate', total: 434}]},{},{}]}
    const customers = this.topCustomers;
    const prettyDates = dates.map(x => this.toFriendlyDate(x));
    //get unique dates in sorted order
    const u = Array.from(new Set(prettyDates)).sort();

    //define our result object to return
    const result = {};
    const dataSets = result['date'] = [];
    //x is accumulator, y is the current iteration, i is index of iteration
    customers.reduce((x, y, i) => {
      console.log('reducing: ', y, 'Index: ', i);
      const customerOrders = [];
      console.log('i:', i);
      dataSets[i] = {
        customer: y,
        orders: u.reduce((r, e, j) => {
          console.log('reducing: ', e, ' at index: ', j);
          const obj = {};
          obj['date'] = e;
          obj['total'] = this.getCustomerDateTotal(e, y); //sum total of orders for customer on this day
          customerOrders.push(obj);
          return customerOrders;
        }),
      };
      return x;
    }, []);
    return result;
  }

  toFriendlyDate(date: Date) {
    return moment(date).endOf('day').format('YY-MM-DD');
  }

  getCustomerDateTotal(date: any, customer: string) {
    const r = this.allOrders.filter(o => o.customer.name === customer
      && this.toFriendlyDate(o.placed) === date);
    const result = r.reduce((a, b) => {
      return a + b.total;
    }, 0);
    return result;
  }
}
