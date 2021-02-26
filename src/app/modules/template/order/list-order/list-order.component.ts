import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { OrderService } from 'src/app/service/order/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

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
    this.orderService.getorderList().subscribe((response: any) => {
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
    },
      (error) => {
        console.log(error, "Error Caught In Fetching Order Details");
      }
    );
    this.appComponent.stopSpinner();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  routeToDeleteDOrder(id_to_delete: any, order: any) {
    if (confirm(`Delete Order Id: ${order.orderNumber}`)) {
      let index = this.orderList.findIndex((data: any) => data.orderId === order.orderId);
      this.orderService.deleteOrderDetails(id_to_delete).subscribe((response: any) => {
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

  routeToCancelOrder(id_to_delete: any, order: any) {
    if (confirm(`Cancel Order Id: ${order.orderNumber}`)) {
      let index = this.orderList.findIndex((data: any) => data.orderId === order.orderId);
      this.orderService.cancelOrderDetails(id_to_delete).subscribe((response: any) => {
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


  routeToEditOrder(orderDetails) {
    let navigationExtras: NavigationExtras = {
      queryParams: { orderId: orderDetails.orderId }
    };
    this.router.navigate(["/home//orderHome/editOrder"], navigationExtras);

  }

  routeToAddOrder() {
    this.router.navigate(['/home/orderHome/addOrder'])
  }

}
