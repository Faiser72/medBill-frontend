import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { OrderService } from 'src/app/service/order/order.service';
import { SalesOrderService } from 'src/app/service/salesOrder/sales-order.service';

@Component({
  selector: 'app-canceled-sales-orders',
  templateUrl: './canceled-sales-orders.component.html',
  styleUrls: ['./canceled-sales-orders.component.scss']
})
export class CanceledSalesOrdersComponent implements OnInit {

  deleted_successfully_message: string = "Deleted Successfully";
  cancelledSalesOrderList;
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "invoiceNumber",
    "salesDate",
    "customerName",
    "totalNetAmount",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private salesOrderService: SalesOrderService,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.startSpinner("Loading...");
    this.salesOrderService.getcancelledSalesOrderList().subscribe((response: any) => {
      if (response.listObject != null) {
        if (response.success) {
          this.cancelledSalesOrderList = response.listObject;
          this.dataSource = new MatTableDataSource(this.cancelledSalesOrderList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.customFilter();
        } else {
          this.dataSource = new MatTableDataSource();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      } else {
        alert("No Data Available")
        this.backtosalesOrderList();
      }
    },
      (error) => {
        console.log(error, "Error Caught In Fetching Order Details");
      }
    );
    this.appComponent.stopSpinner();
  }


  backtosalesOrderList() {
    this.router.navigate(['/home/salesHome/listSales'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  undoCancelledSalesOrder(id_to_delete: any, order: any) {
    if (confirm(`Recycle Invoice Id: ${order.invoiceNumber}`)) {
      let index = this.cancelledSalesOrderList.findIndex((data: any) => data.salesOrderId === order.salesOrderId);
      this.salesOrderService.undoCancelledsalesOrder(id_to_delete).subscribe((response: any) => {
        if (response.success) {
          this.cancelledSalesOrderList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.cancelledSalesOrderList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.customFilter();
        }
        this._snackBar.open(order.orderNumber, response.message, { duration: 2500, });
      })
    }
  }

}
