import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { OrderService } from 'src/app/service/order/order.service';
import { SalesOrderService } from 'src/app/service/salesOrder/sales-order.service';

@Component({
  selector: 'app-deleted-sales-orders',
  templateUrl: './deleted-sales-orders.component.html',
  styleUrls: ['./deleted-sales-orders.component.scss']
})
export class DeletedSalesOrdersComponent implements OnInit {

  deleted_successfully_message: string = "Deleted Successfully";
  deletedSalesOrderList;
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
    this.salesOrderService.getDeletedSalesOrderList().subscribe((response: any) => {
      if (response.listObject != null) {
        if (response.success) {
          this.deletedSalesOrderList = response.listObject;
          this.dataSource = new MatTableDataSource(this.deletedSalesOrderList);
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


  undoDeletedSalesOrder(id_to_delete: any, order: any) {
    if (confirm(`Recycle Invoice Id: ${order.invoiceNumber}`)) {
      let index = this.deletedSalesOrderList.findIndex((data: any) => data.salesOrderId === order.salesOrderId);
      this.salesOrderService.undoDeletedSalesOrder(id_to_delete).subscribe((response: any) => {
        if (response.success) {
          this.deletedSalesOrderList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.deletedSalesOrderList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.customFilter();
        }
        this._snackBar.open(order.orderNumber, response.message, { duration: 2500, });
      })
    }
  }

}
