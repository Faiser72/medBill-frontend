import { ProductMasterServiceService } from './../../../../service/productMaster/product-master-service.service';
import { AppComponent } from './../../../../app.component';
import { ManufactureMasterServiceService } from './../../../../service/manufactureMaster/manufacture-master-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProductCategoryMasterService } from 'src/app/service/productCategoryMaster/product-category-master.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addproductmaster',
  templateUrl: './addproductmaster.component.html',
  styleUrls: ['./addproductmaster.component.scss']
})
export class AddproductmasterComponent implements OnInit {

  addProductMasterForm: FormGroup;
  productCategoryList: any;
  manufacturerList: any;

  filteredCategoryOptions: Observable<any>;
  filteredManufacturerOptions: Observable<any>;

  constructor(private fb: FormBuilder,
    private router: Router,
    private productCategoryMasterService: ProductCategoryMasterService,
    private manufacturerService: ManufactureMasterServiceService,
    private productService: ProductMasterServiceService,
    private location: Location,
    private appComponent: AppComponent) {
    this.addProductMasterFormBuilder();
  }

  ngOnInit() {
    this.getCategoryList();
    this.getManufacturerList();
  }

  getCategoryList() {
    this.productCategoryMasterService.productCategoryList().subscribe((data: any) => {
      if (data.success) {
        this.productCategoryList = data['listObject'];
        console.log(this.productCategoryList);

        this.filteredCategoryOptions = this.addProductMasterForm.get('productCategory').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.categoryName),
          map(productCategory => productCategory ? this._filter(productCategory) : this.productCategoryList.slice()));

      } else {
        alert('No Category is available')
      }
    });
  }

  // productCategory autocomplete starts here
  displayFn(productCategory: any): string {
    return productCategory && productCategory.categoryName ? productCategory.categoryName : '';
  }

  private _filter(productCategory: string): any {

    const filterValue = productCategory.toLowerCase();
    return this.productCategoryList.filter(category => category.categoryName.toLowerCase().indexOf(filterValue) === 0);
  }
  // productCategory autocomplete ends here

  getManufacturerList() {
    this.manufacturerService.manufactureList().subscribe((data: any) => {
      if (data.success) {
        this.manufacturerList = data['listObject'];
        console.log(this.manufacturerList);

        this.filteredManufacturerOptions = this.addProductMasterForm.get('manufacturer').valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.manufacturerName),
          map(manufacturer => manufacturer ? this._filterManufacturer(manufacturer) : this.manufacturerList.slice()));

      } else {
        alert('No Manufacturer is available')
      }
    });
  }

  // manufacturer autocomplete starts here
  displayManufacturerFn(manufacturer: any): string {
    return manufacturer && manufacturer.manufacturerName ? manufacturer.manufacturerName : '';
  }

  private _filterManufacturer(manufacturer: string): any {

    const filterValue = manufacturer.toLowerCase();
    return this.manufacturerList.filter(manufacturer => manufacturer.manufacturerName.toLowerCase().indexOf(filterValue) === 0);
  }
  // manufacturer autocomplete ends here

  addProductMasterFormBuilder() {
    this.addProductMasterForm = this.fb.group({
      productId: [0],
      productName: [null, [Validators.required]],
      productCategory: [null, [Validators.required]],
      hsnCode: [null, [Validators.required]],
      manufacturer: [null, [Validators.required]],
    });
    this.addProductMasterForm.setValidators(this.customValidation());
  }


  addProductMasterFormSubmit() {
    if (this.addProductMasterForm.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.productService
        .addProduct(this.addProductMasterForm.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                if (confirm("Do you want add more Product ?")) {
                  this.addProductMasterForm.reset();
                  this.reset();
                  // this.productService
                  // .getPatientList()
                  // .subscribe((data: any) => {
                  //   this.patientDetailsList = data.listObject;
                  // });
                } else {
                  this.back();
                }
              }, 500);
            } else {
              setTimeout(() => {
                alert(resp.message);
                this.appComponent.stopSpinner();
              }, 1000);
            }
          },
          (error) => {
            setTimeout(() => {
              alert("Error! - Something Went Wrong! Try again.");
              this.appComponent.stopSpinner();
            }, 1000);
          }
        );
    } else {
      alert("Please, fill the proper details.");
    }
  }


  // custom validation starts
  productCategoryInputMsg: string; productCategory: string;

  manufacturerInputMsg: string; manufacturer: string;



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

      // for manufacturer Autocomplete starts here
      const manufacturerFormGroup = formGroup.controls["manufacturer"];
      if (manufacturerFormGroup.value !== "" && manufacturerFormGroup.value !== null) {
        if (typeof (manufacturerFormGroup.value) !== 'object') {
          console.log(typeof (manufacturerFormGroup.value));

          this.manufacturerInputMsg = "Please select from the List";
          manufacturerFormGroup.setErrors({});
        }
      } else {
        this.manufacturerInputMsg = "Please enter this field.";
        manufacturerFormGroup.setErrors({});
      }
      // for manufacturer Autocomplete ends here
      return;
    };
  }
  // custom validation ends


  reset() {
    // for productCategory auto complete starts here
    this.getCategoryList();
    // for productCategory auto complete ends here

    // for Manufacturer auto complete starts here
    this.getManufacturerList();
    // for Manufacturer auto complete ends here

  }

  back() {
    this.location.back();
  }
}
