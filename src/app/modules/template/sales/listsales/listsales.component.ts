import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SalesOrderService } from 'src/app/service/salesOrder/sales-order.service';

@Component({
  selector: 'app-listsales',
  templateUrl: './listsales.component.html',
  styleUrls: ['./listsales.component.scss']
})
export class ListsalesComponent implements OnInit {


  deleted_successfully_message: string = "Deleted Successfully";
  allSalesOrderList;
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "customerName",
    "doctorName",
    "salesDate",
    "totalNetAmount",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private salesOrderService: SalesOrderService) { }

  ngOnInit() {
    this.salesOrderService.allSalesOrderList().subscribe((data: any) => {
      if (data.success) {
        this.allSalesOrderList = data['listObject'];
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  routeToDeleteItemCategory(salesOrderListDetails) {
    if (confirm(`Are you sure to delete this Sales Order ?`)) {
      let index = this.allSalesOrderList.findIndex((data: any) => data.salesOrderId === salesOrderListDetails.salesOrderId);
      if ((salesOrderListDetails.salesOrderId > 0) && (index > -1)) {
        this.salesOrderService.deleteSalesOrderDetails(salesOrderListDetails.salesOrderId).subscribe((resp: any) => {
          if (resp.success) {
            this.allSalesOrderList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.allSalesOrderList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            // this.customFilter();
          }
          this._snackBar.open(salesOrderListDetails.salesOrderId, resp.message, { duration: 2500 });
        });
      }
    }
  }

  routeToCancelSalesOrder(id_to_delete: any, order: any) {
    console.log(order);

    if (confirm(`Cancel this sales order id: ${order.salesOrderId}`)) {
      let index = this.allSalesOrderList.findIndex((data: any) => data.salesOrderId === order.salesOrderId);
      this.salesOrderService.cancelSalesOrderDetails(id_to_delete).subscribe((response: any) => {
        if (response.success) {
          this.allSalesOrderList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.allSalesOrderList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.customFilter();
        }
        this._snackBar.open(order.salesOrderId, response.message, { duration: 2500, });
      })
    }
  }

  routeToUpdateSalesOrder(salesOrderListDetail) {
    let navigationExtras: NavigationExtras = {
      queryParams: { salesOrderId: salesOrderListDetail.salesOrderId }
    };
    this.router.navigate(["/home/salesHome/editSales"], navigationExtras);
  }

  // routeToCancelSalesOrder(salesOrderListDetail){
  //   let navigationExtras: NavigationExtras = {
  //     queryParams: { salesOrderId: salesOrderListDetail.salesOrderId }
  //   };
  //   this.router.navigate(["/home/salesHome/returnSales"], navigationExtras);
  // }

  routeToAddListItem() {
    this.router.navigate(['/home/salesHome/addSales'])
  }


}
