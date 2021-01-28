import { StockService } from './../../../../service/stock/stock.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss']
})
export class StockDetailComponent implements OnInit {

  deleted_successfully_message: string = "Deleted Successfully";

  stockItemDetailsList: any;

  dataSource: any;
  displayedColumns: string[] = [
    "slNo",
    "productType",
    "productName",
    "manufacturer",
    "packaging",
    "batchNumber",
    "manufactureDate",
    "expiryDate",
    "quantity",
    "soldQuantity",
    "balanceQuantity",
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private appComponent: AppComponent,
    private stockService: StockService) { }

  ngOnInit() {
    this.stockService.getStockItemList().subscribe((data: any) => {
      if (data.success) {
        this.stockItemDetailsList = data['listObject'];
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
      const dataStr = data.productType.categoryName + data.productName.productName + data.manufacturer + data.packaging + data.batchNumber + data.manufactureDate + data.expiryDate + data.quantity + data.soldQuantity + data.balanceQuantity;
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
