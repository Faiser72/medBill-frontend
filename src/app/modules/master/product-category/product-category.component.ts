import { ProductCategoryMasterService } from './../../../service/productCategoryMaster/product-category-master.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: any;
  addCategoryMasterForm: FormGroup;

  searchValue: string = null;
  displayedColumns: string[] = [
    "slNo",
    "categoryName",
    "categoryDescription",
    "action"
  ];
  productCategoryDetailsList: any;
  productCategoryDetailsListExceptOne: any;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private productCategoryMasterService: ProductCategoryMasterService,
    private router: Router) {
    this.addCategoryMasterFormBuilder();
  }

  ngOnInit() {

    this.productCategoryMasterService.productCategoryList().subscribe((data: any) => {
      if (data.success) {
        this.productCategoryDetailsList = data['listObject'];
        this.dataSource = new MatTableDataSource(data['listObject']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.customFilter();
      } else {
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  customFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.categoryName;
      return dataStr.trim().toLowerCase().indexOf(filter) != -1;
    }
  }

  addCategoryMasterFormBuilder() {
    this.addCategoryMasterForm = this.fb.group({
      categoryId: [0],
      categoryName: [null, [Validators.required]],
      categoryDescription: [null, [Validators.required]]
    });
    this.addCategoryMasterForm.setValidators(this.customValidation());
  }


  saveCategoryDetails() {
    let categoryName = this.addCategoryMasterForm.get('categoryName').value;
    this.addCategoryMasterForm.patchValue({ categoryName: categoryName.trim().replace(/\s+/g, ' ') });
    if (this.addCategoryMasterForm.valid) {
      this.productCategoryMasterService.addProductCategory(this.addCategoryMasterForm.value).subscribe((resp: any) => {
        if (resp.success) {
          alert(resp.message);
          this.customReset();
        } else {
          alert(resp.message);
        }
      });
    } else {
      alert("please fill the proper Details")
      return false;
    }
  }

  categoryNameInputMsg: string; categoryName: string;
  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      const categoryNameFormGroup = formGroup.controls['categoryName'];
      if (categoryNameFormGroup.value !== '' && categoryNameFormGroup.value !== null) {
        if (categoryNameFormGroup.valid) {
          if (this.btnFlag) {
            if (!isNullOrUndefined(this.productCategoryDetailsListExceptOne)) {
              this.productCategoryDetailsListExceptOne.forEach((data: any) => {
                if (data.categoryName.toLowerCase() == categoryNameFormGroup.value.trim().toLowerCase().replace(/\s+/g, ' ')) {
                  this.categoryName = data.categoryName.toLowerCase();
                  this.categoryNameInputMsg = 'This category name already exist.';
                  categoryNameFormGroup.setErrors({});
                }
              });
            }
          } else {
            if (!isNullOrUndefined(this.productCategoryDetailsList)) {
              this.productCategoryDetailsList.forEach((data: any) => {
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


  routeToDeleteCategory(productCategoryDetails: any) {
    let index = this.productCategoryDetailsList.findIndex((data: any) => data.categoryId === productCategoryDetails.categoryId);
    if ((productCategoryDetails.categoryId > 0) && (index > -1)) {
      this.productCategoryMasterService.deleteProductCategoryDetails(productCategoryDetails.categoryId).subscribe((resp: any) => {
        this.productCategoryDetailsList.splice(index, 1);
        this.customReset();
        this._snackBar.open(productCategoryDetails.categoryName, resp.message, { duration: 2500 });
      });
    }
  }

  btnFlag: boolean = false;
  routeToEditCategory(productCategoryDetails: any) {
    this.btnFlag = true;
    this.productCategoryMasterService.getProductCategoryListExceptOne(productCategoryDetails.categoryId).subscribe((data: any) => {
      this.productCategoryDetailsListExceptOne = data.listObject;
      this.addCategoryMasterForm.patchValue({
        categoryName: productCategoryDetails.categoryName,
        categoryDescription: productCategoryDetails.categoryDescription,
        categoryId: productCategoryDetails.categoryId
      });
    });
  }

  updateCategoryDetails() {
    let categoryName = this.addCategoryMasterForm.get('categoryName').value;
    this.addCategoryMasterForm.patchValue({ categoryName: categoryName.trim().replace(/\s+/g, ' ') });
    if (this.addCategoryMasterForm.valid) {
      this.productCategoryMasterService.updateProductCategoryDetails(this.addCategoryMasterForm.value).subscribe((resp: any) => {
        if (resp.success) {
          alert(resp.message);
          this.customReset();
        } else {
          alert(resp.message);
        }
      });
    } else {
      alert("please fill the proper Details")
      return false;
    }
  }


  customReset() {
    this.addCategoryMasterForm.reset();
    this.ngOnInit();
    this.btnFlag = false;
    this.searchValue = null;
  }


}