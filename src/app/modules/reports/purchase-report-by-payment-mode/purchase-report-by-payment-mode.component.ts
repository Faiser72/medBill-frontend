import { PurchaseEntryService } from 'src/app/service/purchaseEntry/purchase-entry.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { OrderService } from 'src/app/service/order/order.service';
import { ProductCategoryMasterService } from 'src/app/service/productCategoryMaster/product-category-master.service';
import { StockService } from 'src/app/service/stock/stock.service';

@Component({
  selector: 'app-purchase-report-by-payment-mode',
  templateUrl: './purchase-report-by-payment-mode.component.html',
  styleUrls: ['./purchase-report-by-payment-mode.component.scss']
})
export class PurchaseReportByPaymentModeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  pagination: boolean = true;

  dataSource: any;
  currentStocksReportForm: FormGroup;
  isShow: boolean = false;
  today: any;

  searchValue: string = null;
  displayedColumns: string[] = [
    "slNo",
    "orderNumber",
    "supplierName",
    "orderDate",
    "receivedDate",
    "purchaseEntryTotal",
    // "action"
  ];

  // productCategoryList: any;

  productList: any;
  stockReport: any;

  grandTotal: any = 0;


  diffDays: any = [];
  purchaseEntryList: any;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private purchaseEntryService: PurchaseEntryService) {

    // for Current starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for Current ends
    this.currentStocksReportFormBuilder();
  }

  ngOnInit() {
  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.categoryName;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  currentStocksReportFormBuilder() {
    this.currentStocksReportForm = this.fb.group({
      // categoryId: [0],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      paymentMode: [null, [Validators.required]]
    });
    this.currentStocksReportForm.setValidators(this.customValidation());
  }

  saveCategoryDetails() {
    console.log(this.currentStocksReportForm.value);
    this.purchaseEntryService.getAllPurchaseEntryListBtwnDatesAndPayment(this.currentStocksReportForm.value.fromDate, this.currentStocksReportForm.value.toDate, this.currentStocksReportForm.value.paymentMode).subscribe((data: any) => {
      if (data.success) {
        this.purchaseEntryList = data.listObject;
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pagination = false;
        this.customFilter();
        this.calculateTotal(this.purchaseEntryList);
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
      this.grandTotal += +list[i].purchaseEntryTotal;
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
    this.currentStocksReportForm.reset();
    this.ngOnInit();
    this.searchValue = null;
  }


}
