import { StockService } from './../../../service/stock/stock.service';
import { OrderService } from './../../../service/order/order.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProductCategoryMasterService } from 'src/app/service/productCategoryMaster/product-category-master.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-current-stocks-and-aging',
  templateUrl: './current-stocks-and-aging.component.html',
  styleUrls: ['./current-stocks-and-aging.component.scss']
})
export class CurrentStocksAndAgingComponent implements OnInit {

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
    "productType",
    "productName",
    "batchNumber",
    "packaging",
    "quantity",
    "manufactureDate",
    "expiryDate",
    "elapsedDays",
    // "action"
  ];
  categoryDetailsList: any;
  categoryDetailsListExceptOne: any;
  // productCategoryList: any;

  productCategoryList: any;
  filteredOrderOptions: Observable<any>;
  filteredPoductOptions: Observable<any>;
  productList: any;
  stockReport: any;

  diffDays: any = [];

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private productCategoryService: ProductCategoryMasterService,
    private orderService: OrderService,
    private stockService: StockService) {

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
    this.getProductCategoryList();
  }

  //   getProductCategoryList(){
  // this.productCategoryService.productCategoryList().subscribe((data:any)=>{
  //   this.productCategoryList=data.listObject;
  // })
  //   }

  // categoryName autocomplete starts here
  getProductCategoryList() {
    this.productCategoryService.productCategoryList().subscribe((data: any) => {
      if (data.success) {
        this.productCategoryList = data['listObject'];
        this.filteredOrderOptions = this.currentStocksReportForm.get('categoryName').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.categoryName),
          map(categoryName => categoryName ? this._filter(categoryName) : this.productCategoryList.slice()));
      } else {
        alert('No Category is available')
      }
    });
  }

  displayFn(categoryName: any): string {
    return categoryName && categoryName.categoryName ? categoryName.categoryName : '';
  }

  private _filter(categoryName: string): any {
    const filterValue = categoryName.toLowerCase();
    return this.productCategoryList.filter(categoryName => categoryName.categoryName.toLowerCase().indexOf(filterValue) === 0);
  }
  // categoryName autocomplete ends here

  getProductByCategory(category) {
    console.log(category.value.categoryId);
    this.orderService.getPrductsByCategoryId(category.value.categoryId).subscribe((data: any) => {
      if (data.success) {
        this.productList = data.listObject;
        console.log(this.productList);

        this.filteredPoductOptions = this.currentStocksReportForm.get('productName').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.productName),
          map(productName => productName ? this._filters(productName) : this.productList.slice()));
      }
      else {
        alert("There is no products for this Category");
      }
    })
  }

  displayProductFn(productName: any): string {
    return productName && productName.productName ? productName.productName : '';
  }

  private _filters(productName: string): any {
    const filterValue = productName.toLowerCase();
    return this.productList.filter(productName => productName.productName.toLowerCase().indexOf(filterValue) === 0);
  }

  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.categoryName;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  currentStocksReportFormBuilder() {
    this.currentStocksReportForm = this.fb.group({
      categoryId: [0],
      categoryName: [null, [Validators.required]],
      productName: [null, [Validators.required]]
    });
    this.currentStocksReportForm.setValidators(this.customValidation());
  }

  saveCategoryDetails() {
    console.log(this.currentStocksReportForm.value);
    this.stockService.getStockItemListByProductId(this.currentStocksReportForm.value.productName.productId).subscribe((data: any) => {
      if (data.success) {
        let todayDate = new Date(this.today);
        let expDate = [];
        let diff = []

        for (var i = 0; i < data.listObject.length; i++) {
          expDate[i] = new Date(data.listObject[i].expiryDate); //converting string to date
          diff[i] = expDate[i].getTime() - todayDate.getTime(); //converting string to date
          if (diff[i] / (1000 * 3600 * 24) > 0) {
            this.diffDays[i] = diff[i] / (1000 * 3600 * 24);
          }
          else {
            this.diffDays[i] = "Expired"
          }
          // diff[i] = Math.abs(expDate[i].getTime() - todayDate.getTime());
          // this.diffDays[i] = Math.ceil(diff[i] / (1000 * 3600 * 24));          
          // this.diffDays[i]=diff[i] / (1000 * 3600 * 24);
        }
        // var diff = Math.abs(expDate.getTime() - todayDate.getTime());
        // this.diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        // this.displayedColumns[0].elapsedDays
        this.stockReport = data.listObject;
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

  categoryNameInputMsg: string; categoryName: string;
  productNameInputMsg: string; productName: string;

  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      // for categoryName Autocomplete starts here
      const categoryNameFormGroup = formGroup.controls["categoryName"];
      if (categoryNameFormGroup.value !== "" && categoryNameFormGroup.value !== null) {
        console.log(categoryNameFormGroup.value);
        if (typeof (categoryNameFormGroup.value) !== 'object') {
          this.categoryNameInputMsg = "Please select from the List";
          categoryNameFormGroup.setErrors({});
        }
      }
      else {
        this.categoryNameInputMsg = "Please enter this field.";
        categoryNameFormGroup.setErrors({});
      }
      // for categoryName Autocomplete ends here

      // for productName Autocomplete starts here
      const productNameFormGroup = formGroup.controls["productName"];
      if (productNameFormGroup.value !== "" && productNameFormGroup.value !== null) {
        console.log(productNameFormGroup.value);
        if (typeof (productNameFormGroup.value) !== 'object') {
          this.productNameInputMsg = "Please select from the List";
          productNameFormGroup.setErrors({});
        }
      }
      else {
        this.productNameInputMsg = "Please enter this field.";
        productNameFormGroup.setErrors({});
      }
      // for productName Autocomplete ends here
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