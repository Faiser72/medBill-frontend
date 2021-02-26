import { StockService } from './../../../service/stock/stock.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  currentUserAvatar;
  currentUserName;
  placeholder_path: string = "assets/imgs/vitamin.png";
  userId: any;

  today: any;
  todayPlus30: any;
  noOfProductsExpireInNext30Days: any;
  noOfStocks: any;

  constructor(private router: Router,
    private stockService: StockService) {
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

    this.getAllNearByExpiryProducts();
    this.getStocks();
  }

  getAllNearByExpiryProducts() {
    this.stockService.getAllNearByExpiryProducts(this.today, this.todayPlus30).subscribe((data: any) => {
      if (data.success) {
        console.log(data.listObject);
        this.noOfProductsExpireInNext30Days = data.listObject.length;
      }
    });
  }

  getStocks() {
    this.stockService.getStockItemList().subscribe((data: any) => {
      if (data.success) {
        this.noOfStocks = data.listObject.length;
      }
    })
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


  /* for submenu Start here... */
  showOrderSubmenu: boolean = false;
  showMasterSubmenu: boolean = false;
  showReportSubmenu: boolean = false;
  showSalesOrderSubmenu: boolean = false;

  toggleOrderSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }

  toggleMasterSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }

  toggleReportSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }

  toggleSalesOrderSubmenu(submenu: string) {
    let element = document.getElementById(submenu);
    if (element.style.display == '' || element.style.display == 'none') {
      element.style.display = 'block';
    }
    else {
      element.style.display = 'none';
    }
  }
  /* Ends here. */

}
