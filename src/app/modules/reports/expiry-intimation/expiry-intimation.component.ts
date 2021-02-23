import { StockService } from 'src/app/service/stock/stock.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { PurchaseEntryService } from 'src/app/service/purchaseEntry/purchase-entry.service';

@Component({
  selector: 'app-expiry-intimation',
  templateUrl: './expiry-intimation.component.html',
  styleUrls: ['./expiry-intimation.component.scss']
})
export class ExpiryIntimationComponent implements OnInit {

  deleted_successfully_message: string = "Deleted Successfully";

  purchaseItemDetailsList: any;

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "productType",
    "productName",
    "batchNumber",
    "receivedDate",
    "quantity",
    "expiryDate",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  today: any;
  todayPlus30:any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private purchaseEntryService: StockService) { 
      // for Current starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for Current ends

    let todayDate = new Date(this.today);
    this.addDays(todayDate,30) // calling method to add days
    //  console.log(this.addDays(todayDate,30));
    }

  ngOnInit() {
    console.log(this.today, "today");
    console.log(this.todayPlus30,"todatPlus30");

    this.purchaseEntryService.getAllNearByExpiryProducts(this.today,this.todayPlus30).subscribe((data: any) => {
      if (data.success) {
        console.log(data.listObject);
        this.purchaseItemDetailsList = data['listObject'];
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.customFilter();
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
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

returnProduct(productDetails){
  if (confirm("Do you want to return this product ?")) {
    console.log(productDetails);
  } else {
    // this.location.back();
  }
}
  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.productType.categoryName + data.productName.productName + data.manufacturer + data.packaging + data.batchNumber + data.manufactureDate + data.expiryDate + data.quantity + data.soldQuantity + data.balanceQuantity + data.stockId.orderNumber.orderNumber + data.stockId.orderNumber.supplierName.supplierName + data.expiryDate;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToAddListItem() {
    this.router.navigate(['/salesHome/addSales'])
  }

}
