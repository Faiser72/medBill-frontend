import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { ManufactureMasterServiceService } from 'src/app/service/manufactureMaster/manufacture-master-service.service';
import { ProductCategoryMasterService } from 'src/app/service/productCategoryMaster/product-category-master.service';
import { ProductMasterServiceService } from 'src/app/service/productMaster/product-master-service.service';

@Component({
  selector: 'app-editproductmaster',
  templateUrl: './editproductmaster.component.html',
  styleUrls: ['./editproductmaster.component.scss']
})
export class EditproductmasterComponent implements OnInit {

  editProductMasterForm: FormGroup;
  productCategoryList: any;
  manufacturerList: any;
  productId: any;

  filteredCategoryOptions: Observable<any>;
  filteredManufacturerOptions: Observable<any>;

  constructor(private fb: FormBuilder,
    private router: Router,
    private productCategoryMasterService: ProductCategoryMasterService,
    private manufacturerService: ManufactureMasterServiceService,
    private productService: ProductMasterServiceService,
    private location: Location,
    private appComponent: AppComponent,
    private route: ActivatedRoute) {
    this.editProductMasterFormBuilder();
  }

  ngOnInit() {
    this.getCategoryList();
    this.getManufacturerList();


    this.route.queryParams.subscribe((data) => {
      this.productId = data.productId;
    });

    this.productService
      .getProductDetails(this.productId)
      .subscribe((data: any) => {
        console.log(data);
        
        let categoryName = this.productCategoryList.find(
          (jdata: any) =>
            JSON.stringify(jdata) === JSON.stringify(data.object.productCategory)
        ); // To display categoryName in field

        let manufacturerName = this.manufacturerList.find(
          (jdata: any) =>
            JSON.stringify(jdata) === JSON.stringify(data.object.manufacturer)
        ); // To display manufacturerName in field

        this.editProductMasterForm.patchValue(data.object);
        this.editProductMasterForm.patchValue({
          productCategory: categoryName, manufacturer: manufacturerName
        });
      });
  }

  getCategoryList() {
    this.productCategoryMasterService.productCategoryList().subscribe((data: any) => {
      if (data.success) {
        this.productCategoryList = data['listObject'];
        console.log(this.productCategoryList);

        this.filteredCategoryOptions = this.editProductMasterForm.get('productCategory').valueChanges.pipe(
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

        this.filteredManufacturerOptions = this.editProductMasterForm.get('manufacturer').valueChanges.pipe(
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

  editProductMasterFormBuilder() {
    this.editProductMasterForm = this.fb.group({
      productId: [0],
      productName: [null, [Validators.required]],
      productCategory: [null, [Validators.required]],
      hsnCode: [null, [Validators.required]],
      manufacturer: [null, [Validators.required]],
    });
    this.editProductMasterForm.setValidators(this.customValidation());
  }


  editProductMasterFormSubmit() {
    if (this.editProductMasterForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.productService.updateProductDetails(this.editProductMasterForm.value).subscribe((data: any) => {
        if (data.success) {
          this.appComponent.stopSpinner();
          alert(data.message)
          this.back();
          // this._snackBar.open(data.object.candidateName, data.message, { duration: 2500 });
        } else {
          this.appComponent.stopSpinner();
          alert(data.message)
          //this._snackBar.open(data.object.candidateName, data.message, { duration: 2500 });
        }
      });
    } else {
      this.appComponent.stopSpinner();
      alert("Please, fill the proper details.");
      // this._snackBar.open("Error", "Invalid data", { duration: 2500 });
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
