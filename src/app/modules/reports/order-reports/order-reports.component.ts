import { OrderService } from 'src/app/service/order/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-order-reports',
  templateUrl: './order-reports.component.html',
  styleUrls: ['./order-reports.component.scss']
})
export class OrderReportsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pagination: boolean = true;

  dataSource: any;
  orderReportForm: FormGroup;
  isShow: boolean = false;
  today: any;

  searchValue: string = null;
  displayedColumns: string[] = [
    "slNo",
    "orderNumber",
    "orderDate",
    "orderGrandTotal",
    "supplierName",
    "contactPersonName",
    "contactPersonNumber"
    // "action"
  ];

  // productCategoryList: any;

  productList: any;
  stockReport: any;

  diffDays: any = [];
  orderList: any;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private orderService: OrderService) {

    // for Current starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for Current ends
    this.orderReportFormBuilder();
  }

  ngOnInit() {
  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.categoryName;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  orderReportFormBuilder() {
    this.orderReportForm = this.fb.group({
      // categoryId: [0],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
    });
    this.orderReportForm.setValidators(this.customValidation());
  }

  saveCategoryDetails() {
    console.log(this.orderReportForm.value);
    this.orderService.getAllOrderListBtwnDates(this.orderReportForm.value.fromDate, this.orderReportForm.value.toDate).subscribe((data: any) => {
      if (data.success) {
        this.orderList = data.listObject;
        console.log(this.orderList);

        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pagination = false;
        this.customFilter();
      }
      else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pagination = true;
        alert('No Data Found')
      }
    })
  }

  reportShowHide() {
    this.isShow = true;
  }

  toDateInputMsg: string; toDate: string;

  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {

      // for toDate Autocomplete starts here
      const toDateFormGroup = formGroup.controls["toDate"];
      const fromDateFormGroup = formGroup.controls['fromDate'];
      if (toDateFormGroup.value !== "" && toDateFormGroup.value !== null) {
        console.log(toDateFormGroup.value);
        if (toDateFormGroup.value < fromDateFormGroup.value) {
          this.toDateInputMsg = "To Date Should be greater than From Date";
          toDateFormGroup.setErrors({});
        }
      }
      else {
        this.toDateInputMsg = "Please enter this field.";
        toDateFormGroup.setErrors({});
      }
      // for toDate Autocomplete ends here
      return;
    };
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  customReset() {
    this.orderReportForm.reset();
    this.ngOnInit();
    this.searchValue = null;
  }


}
