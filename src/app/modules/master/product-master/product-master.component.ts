import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss']
})
export class ProductMasterComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  addProductMasterForm: FormGroup;

  searchValue: string = null;
  displayedColumns: string[] = [
    "slNo",
    "productName",
    "productCategory",
    "hsnCode",
    "manufacturerName",
    "action"
  ];
  categoryDetailsList: any;
  categoryDetailsListExceptOne: any;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.addProductMasterFormBuilder();
  }

  ngOnInit() {

  }
  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.productName;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  addProductMasterFormBuilder() {
    this.addProductMasterForm = this.fb.group({
      productId: [0],
      productName: [null, [Validators.required]],
      productCategory: [null, [Validators.required]],
      hsnCode:[null, [Validators.required]],
      manufacturerName:[null, [Validators.required]],
    });
    this.addProductMasterForm.setValidators(this.customValidation());
  }

  saveProductDetails() {

  }

  productNameInputMsg: string; productName: string;
  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      const productNameFormGroup = formGroup.controls['productName'];
      if (productNameFormGroup.value !== '' && productNameFormGroup.value !== null) {
        if (productNameFormGroup.valid) {
          if (this.btnFlag) {
            if (!isNullOrUndefined(this.categoryDetailsListExceptOne)) {
              this.categoryDetailsListExceptOne.forEach((data: any) => {
                if (data.productName.toLowerCase() == productNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
                  this.productName = data.productName.toLowerCase();
                  this.productNameInputMsg = 'This category name already exist.';
                  productNameFormGroup.setErrors({});
                }
              });
            }
          } else {
            if (!isNullOrUndefined(this.categoryDetailsList)) {
              this.categoryDetailsList.forEach((data: any) => {
                if (data.productName.toLowerCase() == productNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
                  this.productName = data.productName.toLowerCase();
                  this.productNameInputMsg = 'This category name already exist.';
                  productNameFormGroup.setErrors({});
                }
              });
            }
          }
        } else {
          if (this.productName == productNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
            this.productNameInputMsg = 'This category name already exist.';
          } else {
            this.productNameInputMsg = 'Please enter a valid category name';
          }
        }
      } else {
        this.productNameInputMsg = 'Please enter this field.';
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

  routeToDeleteProduct(categoryDetails: any) {
    // let index = this.categoryDetailsList.findIndex((data: any) => data.categoryId === categoryDetails.categoryId);
    // if ((categoryDetails.categoryId > 0) && (index > -1)) {
    //   this.categoryMasterService.deleteCategoryMasterDetails(categoryDetails.categoryId).subscribe((resp: any) => {
    //     this.categoryDetailsList.splice(index, 1);
    //     this.customReset();
    //     this._snackBar.open(categoryDetails.productName, resp.message, { duration: 2500 });
    //   });
    // }
  }

  btnFlag: boolean = false;
  routeToEditProduct(categoryDetails: any) {
    // this.btnFlag = true;
    // this.categoryMasterService.getCategoryMasterListExceptOne(categoryDetails.categoryId).subscribe((data: any) => {
    //   this.categoryDetailsListExceptOne = data.listObject;
    //   this.addProductMasterForm.patchValue({
    //     productName: categoryDetails.productName,
    //     categoryId: categoryDetails.categoryId
    //   });
    // });
  }

  updateProductDetails() {
    // let productName = this.addProductMasterForm.get('productName').value;
    // this.addProductMasterForm.patchValue({ productName: productName.trim().replace(/\s+/g, ' ') });
    // if (this.addProductMasterForm.valid) {
    //   this.categoryMasterService.updateCategoryMasterDetails(this.addProductMasterForm.value).subscribe((resp: any) => {
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
    this.addProductMasterForm.reset();
    this.ngOnInit();
    this.btnFlag = false;
    this.searchValue = null;
  }


}
