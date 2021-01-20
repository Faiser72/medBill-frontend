import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  primaryRole = new FormControl();

  roleList: string[] = ['Admin', 'Instructor', 'Evaluator', 'Student'];


  constructor(private fb: FormBuilder,
    private router: Router,
    private appComponent: AppComponent,
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
  }

  editManufacturerMasterFormBuilder() {
    this.editManufacturerMasterForm = this.fb.group({
      manufacturerName: [null, [Validators.required, Validators.minLength(3)]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
      contactPersonName: [null, [Validators.required, Validators.minLength(3)]],
      contactPersonPhoneNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern)],
      ],
      emailId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$"),
        ]),],


    });
  }


  editManufacturerMasterFormSubmit() {
    console.log(this.editManufacturerMasterForm.value);
    console.log(this.primaryRole.value);
  }

  backToAppointmentList() {
    this.router.navigate(["/home/appointmenthome/listappointment"]);
  }

  back() {
    this.location.back();
  }
}
