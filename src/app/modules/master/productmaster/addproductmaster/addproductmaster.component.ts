import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProductCategoryMasterService } from 'src/app/service/productCategoryMaster/product-category-master.service';

@Component({
  selector: 'app-addproductmaster',
  templateUrl: './addproductmaster.component.html',
  styleUrls: ['./addproductmaster.component.scss']
})
export class AddproductmasterComponent implements OnInit {

  addProductMasterForm: FormGroup;
  productCategoryList:any;

  filteredCategoryOptions: Observable<any>;

  constructor(private fb: FormBuilder,
    private router: Router,
    private productCategoryMasterService:ProductCategoryMasterService) {
    this.addProductMasterFormBuilder();
   }

  ngOnInit() {
     this.getCategoryList();
  }

  getCategoryList() {
    this.productCategoryMasterService.productCategoryList().subscribe((data: any) => {
      if (data.success) {
        this.productCategoryList = data['listObject'];
        this.filteredCategoryOptions = this.addProductMasterForm.get('productCategory').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.categoryName),
          map(productCategory => productCategory ? this._filter(productCategory) : this.productCategoryList.slice()));
      } else {
        alert('No Category is available')
      }
    });
  }

  // getDoctorList() {
  //   this.doctorService.getDoctorList().subscribe((data: any) => {
  //     if (data.success) {
  //       this.doctorDetailsList = data['listObject'];
  //       this.filteredDoctorOptions = this.addAppointmentForm.get('doctorName').valueChanges.pipe(
  //         startWith(''),
  //         map(docvalue => typeof docvalue === 'string' ? docvalue : docvalue.doctorName),
  //         map(doctorName => doctorName ? this._filters(doctorName) : this.doctorDetailsList.slice()));
  //     } else {
  //       alert('sorry no doctors available')
  //     }
  //   });
  // }

    // productCategory autocomplete starts here
    displayFn(productCategory: any): string {
      return productCategory && productCategory.productCategory ? productCategory.productCategory : '';
    }
  
    private _filter(productCategory: string): any {
      const filterValue = productCategory.toLowerCase();
      return this.productCategoryList.filter(category => category.productCategory.toLowerCase().indexOf(filterValue) === 0);
    }
    // productCategory autocomplete ends here

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


  addProductMasterFormSubmit(){

  }


  // custom validation starts
  productCategoryInputMsg: string; productCategory: string;


  customValidation(): ValidatorFn {
    return (formGroup: FormGroup): ValidationErrors => {
      // for productCategory Autocomplete starts here
      const productCategoryFormGroup = formGroup.controls["productCategory"];
      if (productCategoryFormGroup.value !== "" && productCategoryFormGroup.value !== null) {
        if (typeof (productCategoryFormGroup.value) !== 'object') {
          console.log(typeof (productCategoryFormGroup.value));

          this.productCategoryInputMsg = "Please select from the List";
          productCategoryFormGroup.setErrors({});
        }
      } else {
        this.productCategoryInputMsg = "Please enter this field.";
        productCategoryFormGroup.setErrors({});
      }
      // for productCategory Autocomplete ends here
      return;
    };
  }
  // custom validation ends


  reset() {
    // for productCategory auto complete starts here
    this.getCategoryList();
    // for productCategory auto complete ends here
  }
}
