import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { SupplierMasterService } from 'src/app/service/supplierMaster/supplier-master.service';

@Component({
  selector: 'app-editsuppliermaster',
  templateUrl: './editsuppliermaster.component.html',
  styleUrls: ['./editsuppliermaster.component.scss']
})
export class EditsuppliermasterComponent implements OnInit {

  addSupplierMasterForm: FormGroup;
  phonePattern = "^[0-9_-]{10}$";
  minDate: any;
  maxDate: any;
  today: any;
  supplierId: any;




  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private supplierMasterService: SupplierMasterService,
    private appComponent: AppComponent,
    private location: Location) {
  }

  ngOnInit() {
    this.addSupplierMasterFormBuilder();

    this.route.queryParams.subscribe((data) => {
      this.supplierId = data.supplierId;
    });

    this.supplierMasterService
      .getSupplierDetailId(this.supplierId)
      .subscribe((data: any) => {
        this.addSupplierMasterForm.patchValue(data.object);
      });
  }

  addSupplierMasterFormBuilder() {
    this.addSupplierMasterForm = this.fb.group({
      supplierName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern(this.phonePattern), Validators.pattern(/^[0-9]{10}$/)],
      ],
      contactPersonName: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z]*$/)]],
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
      supplierId: ""

    });
  }


  updateSupplierMasterFormSubmit() {
    if (this.addSupplierMasterForm.valid) {
      this.appComponent.startSpinner("Updating data..\xa0\xa0Please wait ...");
      this.supplierMasterService.updateSupplierDetail(this.addSupplierMasterForm.value).subscribe((data: any) => {
        if (data.success) {
          this.appComponent.stopSpinner();
          alert(data.message)
          this.backToSupplierList();
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

  backToSupplierList() {
    this.router.navigate(["/home/supplierMasterHome/listsupplier"]);
  }

  back() {
    this.location.back();
  }
}
