import { SupplierMasterService } from './../../../../service/supplierMaster/supplier-master.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-addsuppliermaster',
  templateUrl: './addsuppliermaster.component.html',
  styleUrls: ['./addsuppliermaster.component.scss']
})
export class AddsuppliermasterComponent implements OnInit {

  addSupplierMasterForm: FormGroup;
  phonePattern = "^[0-9_-]{10}$";
  minDate: any;
  maxDate: any;
  today: any;

  primaryRole = new FormControl();

  roleList: string[] = ['Admin', 'Instructor', 'Evaluator', 'Student'];


  constructor(private fb: FormBuilder,
    private router: Router,
    private supplierMasterService: SupplierMasterService,
    private appComponent: AppComponent) {
    // for date validation starts
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    this.today = yyyy + '-' + mm + '-' + dd;
    // for date validation ends
  }

  ngOnInit() {
    this.addSupplierMasterFormBuilder();
  }

  addSupplierMasterFormBuilder() {
    this.addSupplierMasterForm = this.fb.group({
      // Validators.pattern(/^[a-zA-Z]*$/)
      supplierName: [null, [Validators.required, Validators.minLength(3)]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern), Validators.pattern(/^[0-9]{10}$/)],
      ],
      contactPersonName: [null, [Validators.required, Validators.minLength(3)]],
      contactPersonNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern), Validators.pattern(/^[0-9]{10}$/)],
      ],
      contactPersonEmailId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$"),
        ]),],


    });
  }


  addSupplierMasterFormSubmit() {
    if (this.addSupplierMasterForm.valid) {
      this.appComponent.startSpinner("Saving data..\xa0\xa0Please wait ...");
      this.supplierMasterService
        .saveSupplierMaster(this.addSupplierMasterForm.value)
        .subscribe(
          (resp: any) => {
            if (resp.success) {
              alert(resp.message);
              this.appComponent.stopSpinner();
              setTimeout(() => {
                if (confirm("Do you want add more Supplier ?")) {
                  this.addSupplierMasterForm.reset();
                } else {
                  this.backToSupplierList();
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

  backToSupplierList() {
    this.router.navigate(["/home/supplierMasterHome/listsupplier"]);
  }

  reset() {

  }
}
