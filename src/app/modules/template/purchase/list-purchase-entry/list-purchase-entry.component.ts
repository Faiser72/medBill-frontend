import { PurchaseEntryService } from 'src/app/service/purchaseEntry/purchase-entry.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-list-purchase-entry',
  templateUrl: './list-purchase-entry.component.html',
  styleUrls: ['./list-purchase-entry.component.scss']
})
export class ListPurchaseEntryComponent implements OnInit {

  deleted_successfully_message: string = "Deleted Successfully";

  purchaseDetailsList: any;

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "orderNumber",
    "orderDate",
    "receivedDate",
    "supplierName",
    "supplierInvoiceNumber",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private purchaseEntryService: PurchaseEntryService) { }

  ngOnInit() {
    this.purchaseEntryService.getPurchaseEntryList().subscribe((data: any) => {
      if (data.success) {
        this.purchaseDetailsList = data['listObject'];
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
      const dataStr = data.orderNumber.orderNumber + data.orderNumber.supplierName.supplierName + data.orderNumber.orderDate + data.receivedDate + data.supplierInvoiceNumber;
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
    this.router.navigate(['/home/puchaseEntryHome/addPurchaseEntry'])
  }

  routeToEditPurchaseEntry(purchaseEntryDetails: any) {
    console.log(purchaseEntryDetails);

    let navigationExtras: NavigationExtras = {
      queryParams: { purchaseEntryId: purchaseEntryDetails.purchaseEntryId }
    };
    this.router.navigate(["/home/puchaseEntryHome/editPurchaseEntry"], navigationExtras);
  }

  routeToPurchaseReturns(purchaseEntryDetails: any) {
    console.log(purchaseEntryDetails);

    let navigationExtras: NavigationExtras = {
      queryParams: { purchaseEntryId: purchaseEntryDetails.purchaseEntryId }
    };
    this.router.navigate(["/home/puchaseEntryHome/returnPurchaseEntry"], navigationExtras);
  }

  deletePurchaseEntry(purchaseEntryDetails) {
    // console.log(purchaseEntryDetails);
    // this.purchaseEntryService.deletePurchaseAndStock(purchaseEntryDetails.purchaseEntryId).subscribe((response:any)=>{
    //   alert(response.message)
    //   console.log(response);
    // })
    if (confirm(`Are you sure to delete this PurchaseEntry ?`)) {
      let index = this.purchaseDetailsList.findIndex((data: any) => data.purchaseEntryId === purchaseEntryDetails.purchaseEntryId);
      if ((purchaseEntryDetails.purchaseEntryId > 0) && (index > -1)) {
        this.purchaseEntryService.deletePurchaseAndStock(purchaseEntryDetails.purchaseEntryId).subscribe((resp: any) => {
          if (resp.success) {
            this.purchaseDetailsList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.purchaseDetailsList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.customFilter();
          }
          this._snackBar.open(purchaseEntryDetails.orderNumber.orderNumber, resp.message, { duration: 2500 });
        });
      }
    }
  }

}
