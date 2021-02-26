import { SalesOrderService } from 'src/app/service/salesOrder/sales-order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-report-by-payment-mode',
  templateUrl: './sales-report-by-payment-mode.component.html',
  styleUrls: ['./sales-report-by-payment-mode.component.scss']
})
export class SalesReportByPaymentModeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pagination: boolean = true;

  dataSource: any;
  salesOrderReportForm: FormGroup;
  isShow: boolean = false;
  today: any;
  grandTotal: any = 0;


  searchValue: string = null;
  displayedColumns: string[] = [
    "slNo",
    "invoiceNumber",
    "customerName",
    "salesDate",
    "totalNetAmount",
    // "action"
  ];

  // productCategoryList: any;

  productList: any;
  stockReport: any;

  diffDays: any = [];
  salesOrderList: any;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private salesOrderService: SalesOrderService) {

    // for Current starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for Current ends
    this.salesOrderReportFormBuilder();
  }

  ngOnInit() {
  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.categoryName;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  salesOrderReportFormBuilder() {
    this.salesOrderReportForm = this.fb.group({
      // categoryId: [0],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      paymentMode: [null, [Validators.required]]
    });
    this.salesOrderReportForm.setValidators(this.customValidation());
  }

  getSalesDetails() {
    console.log(this.salesOrderReportForm.value);
    this.salesOrderService.getAllSalesListBtwnDatesAndPayment(this.salesOrderReportForm.value.fromDate, this.salesOrderReportForm.value.toDate, this.salesOrderReportForm.value.paymentMode).subscribe((data: any) => {
      if (data.success) {
        this.salesOrderList = data.listObject;
        console.log(this.salesOrderList);

        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pagination = false;
        this.customFilter();
        this.calculateTotal(this.salesOrderList)
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

  calculateTotal(list) {
    for (var i = 0; i < list.length; i++) {
      this.grandTotal += +list[i].totalNetAmount;
    }
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
    this.salesOrderReportForm.reset();
    this.ngOnInit();
    this.searchValue = null;
  }


}