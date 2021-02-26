import { Router } from '@angular/router';
import { StockService } from './../../../service/stock/stock.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  noOfProducts: any;
  today: any;
  todayPlus30: any;
  noOfProductsExpireInNext30Days: any;
  nearByExpiryStockDetails: any;
  constructor(private stockService: StockService,
    private route: Router) {
    // for Current starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for Current ends

    let todayDate = new Date(this.today);
    this.addDays(todayDate, 30) // calling method to add days
    //  console.log(this.addDays(todayDate,30));
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(`lat:${position.coords.latitude}, lon:${position.coords.longitude}`);
    })

    this.getStockList();

    this.getStocks();
  }

  getStockList() {
    this.stockService.getStockItemList().subscribe((data: any) => {
      if (data.success) {
        this.noOfProducts = data.listObject.length;
      }
    })
  }

  getStocks() {
    this.stockService.getAllNearByExpiryProducts(this.today, this.todayPlus30).subscribe((data: any) => {
      if (data.success) {
        console.log(data.listObject);
        this.noOfProductsExpireInNext30Days = data.listObject.length;
        this.nearByExpiryStockDetails = data.listObject;
        console.log(this.nearByExpiryStockDetails);
      }
    });
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    this.todayPlus30 = yyyy + '-' + mm + '-' + dd;
    console.log(this.todayPlus30);
    return date;
  }

  routeToExpiryIntimation() {
    this.route.navigate(['/home/expiryIntimation'])
  }
}
