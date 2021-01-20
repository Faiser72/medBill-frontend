import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listproductmaster',
  templateUrl: './listproductmaster.component.html',
  styleUrls: ['./listproductmaster.component.scss']
})
export class ListproductmasterComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;

  displayedColumns: string[] = [
    "slNo",
    "productName",
    "productCategory",
    "hsnCode",
    "manufacturerName",
    "action"
  ];

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.productName;
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


  routeToEditProduct(){

  }

  routeToDeleteProduct(){

  }

  routeToAddProduct(){
    this.router.navigate(['home/productMasterHome/addproductmaster'])
  }
}
