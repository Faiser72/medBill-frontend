import { ProductMasterServiceService } from './../../../../service/productMaster/product-master-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-listproductmaster',
  templateUrl: './listproductmaster.component.html',
  styleUrls: ['./listproductmaster.component.scss']
})
export class ListproductmasterComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  productDetailsList: any;

  dataSource: any;

  displayedColumns: string[] = [
    "slNo",
    "productName",
    "productCategory",
    "hsnCode",
    "manufacturer",
    "action"
  ];

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private productService: ProductMasterServiceService) { }

  ngOnInit() {
    this.productService.productList().subscribe((data: any) => {
      if (data.success) {
        this.productDetailsList = data['listObject'];
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
      const dataStr = data.productCategory.categoryName + data.manufacturer.manufacturerName;
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


  routeToEditProduct(productDetails) {
    let navigationExtras: NavigationExtras = {
      queryParams: { productId: productDetails.productId }
    };
    this.router.navigate(["/home/productMasterHome/editproductmaster"], navigationExtras);
  }

  routeToDeleteProduct(productDetails) {
    if (confirm(`Are you sure to delete this Product ?`)) {
      let index = this.productDetailsList.findIndex((data: any) => data.productId === productDetails.productId);
      if ((productDetails.productId > 0) && (index > -1)) {
        this.productService.deleteProductDetails(productDetails.productId).subscribe((resp: any) => {
          if (resp.success) {
            this.productDetailsList.splice(index, 1);
            this.dataSource = new MatTableDataSource(this.productDetailsList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.customFilter();
          }
          this._snackBar.open(productDetails.productName, resp.message, { duration: 2500 });
        });
      }
    }

  }

  routeToAddProduct() {
    this.router.navigate(['home/productMasterHome/addproductmaster'])
  }
}
