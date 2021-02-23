import { PurchaseEntryService } from 'src/app/service/purchaseEntry/purchase-entry.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-purchase-return-report',
  templateUrl: './purchase-return-report.component.html',
  styleUrls: ['./purchase-return-report.component.scss']
})
export class PurchaseReturnReportComponent implements OnInit {

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
    "returnDate",
    "reasonForReturn",
    "supplierName",
    "orderNumber",

  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private purchaseEntryService: PurchaseEntryService) { }

  ngOnInit() {
    this.purchaseEntryService.listAllReturnPurchaseEntry().subscribe((data: any) => {
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


  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.productType.categoryName + data.productName.productName + data.manufacturer + data.packaging + data.batchNumber + data.manufactureDate + data.expiryDate + data.quantity + data.soldQuantity + data.balanceQuantity + data.purchaseEntryId.orderNumber.orderNumber + data.purchaseEntryId.orderNumber.supplierName.supplierName + data.purchaseEntryId.reasonForReturn;
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
