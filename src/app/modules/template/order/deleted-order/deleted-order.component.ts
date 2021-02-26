import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-deleted-order',
  templateUrl: './deleted-order.component.html',
  styleUrls: ['./deleted-order.component.scss']
})
export class DeletedOrderComponent implements OnInit {

  deleted_successfully_message: string = "Deleted Successfully";
  orderList;
  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "orderNumber",
    "orderDate",
    "supplierName",
    "orderGrandTotal",
    "action"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private orderService: OrderService,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.appComponent.startSpinner("Loading...");
    this.orderService.getDeletedOrderList().subscribe((response: any) => {
      if (response.listObject != null) {
        if (response.success) {
          this.orderList = response.listObject;

          this.dataSource = new MatTableDataSource(this.orderList);
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
        this.backtoOrderList();
      }


    },
      (error) => {
        console.log(error, "Error Caught In Fetching Order Details");
      }
    );
    this.appComponent.stopSpinner();
  }

  backtoOrderList() {
    this.router.navigate(['/home/orderHome/listOrder'])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  undoDeletedOrder(id_to_delete: any, order: any) {
    if (confirm(`Recycle Order Id: ${order.orderNumber}`)) {
      let index = this.orderList.findIndex((data: any) => data.orderId === order.orderId);
      this.orderService.undoDeletedOrder(id_to_delete).subscribe((response: any) => {
        if (response.success) {
          this.orderList.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.orderList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.customFilter();
        }
        this._snackBar.open(order.orderNumber, response.message, { duration: 2500, });
      })
    }
  }
}
