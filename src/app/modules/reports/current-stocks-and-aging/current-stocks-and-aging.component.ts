import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-current-stocks-and-aging',
  templateUrl: './current-stocks-and-aging.component.html',
  styleUrls: ['./current-stocks-and-aging.component.scss']
})
export class CurrentStocksAndAgingComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  currentStocksReportForm: FormGroup;
  isShow: boolean = false;

  searchValue: string = null;
  displayedColumns: string[] = [
    "slNo",
    "categoryName",
    "productName",
    "batch",
    "packaging",
    "quantity",
    "manufacturedDate",
    "expiryDate",
    "elapsedDays",
    // "action"
  ];
  categoryDetailsList: any;
  categoryDetailsListExceptOne: any;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router) {
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
      categoryId: [0],
      categoryName: [null, [Validators.required]],
      productName: [null, [Validators.required]]
    });
    this.currentStocksReportForm.setValidators(this.customValidation());
  }

  saveCategoryDetails() {

  }

  reportShowHide() {
    this.isShow = true;
  }

  categoryNameInputMsg: string; categoryName: string;
  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      const categoryNameFormGroup = formGroup.controls['categoryName'];
      if (categoryNameFormGroup.value !== '' && categoryNameFormGroup.value !== null) {
        if (categoryNameFormGroup.valid) {
          if (this.btnFlag) {
            if (!isNullOrUndefined(this.categoryDetailsListExceptOne)) {
              this.categoryDetailsListExceptOne.forEach((data: any) => {
                if (data.categoryName.toLowerCase() == categoryNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
                  this.categoryName = data.categoryName.toLowerCase();
                  this.categoryNameInputMsg = 'This category name already exist.';
                  categoryNameFormGroup.setErrors({});
                }
              });
            }
          } else {
            if (!isNullOrUndefined(this.categoryDetailsList)) {
              this.categoryDetailsList.forEach((data: any) => {
                if (data.categoryName.toLowerCase() == categoryNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
                  this.categoryName = data.categoryName.toLowerCase();
                  this.categoryNameInputMsg = 'This category name already exist.';
                  categoryNameFormGroup.setErrors({});
                }
              });
            }
          }
        } else {
          if (this.categoryName == categoryNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
            this.categoryNameInputMsg = 'This category name already exist.';
          } else {
            this.categoryNameInputMsg = 'Please enter a valid category name';
          }
        }
      } else {
        this.categoryNameInputMsg = 'Please enter this field.';
      }

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

  routeToDeleteCategory(categoryDetails: any) {
    // let index = this.categoryDetailsList.findIndex((data: any) => data.categoryId === categoryDetails.categoryId);
    // if ((categoryDetails.categoryId > 0) && (index > -1)) {
    //   this.categoryMasterService.deleteCategoryMasterDetails(categoryDetails.categoryId).subscribe((resp: any) => {
    //     this.categoryDetailsList.splice(index, 1);
    //     this.customReset();
    //     this._snackBar.open(categoryDetails.categoryName, resp.message, { duration: 2500 });
    //   });
    // }
  }

  btnFlag: boolean = false;
  routeToEditCategory(categoryDetails: any) {
    // this.btnFlag = true;
    // this.categoryMasterService.getCategoryMasterListExceptOne(categoryDetails.categoryId).subscribe((data: any) => {
    //   this.categoryDetailsListExceptOne = data.listObject;
    //   this.currentStocksReportForm.patchValue({
    //     categoryName: categoryDetails.categoryName,
    //     categoryId: categoryDetails.categoryId
    //   });
    // });
  }

  updateCategoryDetails() {
    // let categoryName = this.currentStocksReportForm.get('categoryName').value;
    // this.currentStocksReportForm.patchValue({ categoryName: categoryName.trim().replace(/\s+/g, ' ') });
    // if (this.currentStocksReportForm.valid) {
    //   this.categoryMasterService.updateCategoryMasterDetails(this.currentStocksReportForm.value).subscribe((resp: any) => {
    //     if (resp.success) {
    //       alert(resp.message);
    //       this.customReset();
    //     } else {
    //       alert(resp.message);
    //     }
    //   });
    // } else {
    //   alert("please fill the proper Details")
    //   return false;
    // }
  }


  customReset() {
    this.currentStocksReportForm.reset();
    this.ngOnInit();
    this.btnFlag = false;
    this.searchValue = null;
  }


}