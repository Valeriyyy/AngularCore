import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import * as moment from 'moment';


/*const SAMPLE_BARCHART_DATA: any[] = [
  { data: [65, 59, 80, 81, 56, 54, 30], label: 'Q3 Sales' },
  { data: [25, 39, 60, 91, 36, 54, 30], label:  'Q4 Sales' }
];

const SAMPLE_BARCHART_LABELS: string[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];
*/
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private _salesDataService: SalesDataService) { }

  orders: any;
  orderLabels: string[];
  orderData: number[];

  public barChartData: any[];
  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  ngOnInit() {
    this._salesDataService.getOrders(1, 100)
      .subscribe( res => {
        console.log(res['page']['data']);
      });
  }

}
