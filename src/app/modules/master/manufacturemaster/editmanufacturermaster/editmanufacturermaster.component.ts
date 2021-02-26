import { ManufactureMasterServiceService } from './../../../../service/manufactureMaster/manufacture-master-service.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-editmanufacturermaster',
  templateUrl: './editmanufacturermaster.component.html',
  styleUrls: ['./editmanufacturermaster.component.scss']
})
export class EditmanufacturermasterComponent implements OnInit {

  editManufacturerMasterForm: FormGroup;
  phonePattern = "^[0-9_-]{10}$";
  minDate: any;
  maxDate: any;
  today: any;

  manufacturerId: any;
  manufacturerList: any;

  primaryRole = new FormControl();

  roleList: string[] = ['Admin', 'Instructor', 'Evaluator', 'Student'];


  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appComponent: AppComponent,
    private manufacturerService: ManufactureMasterServiceService,
    private location: Location) {
    // for date validation starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for date validation ends
  }

  ngOnInit() {
    this.editManufacturerMasterFormBuilder();

    this.route.queryParams.subscribe((data) => {
      this.manufacturerId = data.manufacturerId;
    });

    this.getManufacturerList();


    this.manufacturerService
      .getManufacturerDetails(this.manufacturerId)
      .subscribe((data: any) => {
        this.editManufacturerMasterForm.patchValue(data.object);
      });
  }

  getManufacturerList() {
    return new Promise<void>((resolve, reject) => {
      // setTimeout(() => {
      this.manufacturerService.getManufactureListExceptOne(this.manufacturerId).subscribe(
        (response: any) => {
          this.manufacturerList = response.listObject;
        })
      const error = false;
      if (!error) {
        resolve();
      }
      else {
        reject("getManufacturerList() returns error");
      }
      // }, 2000)
    });
  }
  editManufacturerMasterFormBuilder() {
    this.editManufacturerMasterForm = this.fb.group({
      manufacturerId: "",
      manufacturerName: [null, [Validators.required, Validators.minLength(3)]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
      contactPersonName: [null, [Validators.required, Validators.minLength(3)]],
      contactPersonNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
      contactPersonEmailId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$"),
        ]),],
    });
  }


  editManufacturerMasterFormSubmit() {
    if (this.editManufacturerMasterForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.manufacturerService.updateManufactureDetails(this.editManufacturerMasterForm.value).subscribe((data: any) => {
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


  back() {
    this.location.back();
  }
}
