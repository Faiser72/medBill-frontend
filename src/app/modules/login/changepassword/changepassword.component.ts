import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { PasswordService } from 'src/app/service/password/password.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  hide = true;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  changePasswordStatus: string;
  color = "red";
  constructor(private formBuilder: FormBuilder, private passwordService: PasswordService, private appComponent: AppComponent) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: [null, [Validators.required]]
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      thirdCtrl: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  // this method is used to change password by checking old password
  changePassword() {
    this.color = "red";
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      let currentPassword = this.firstFormGroup.get("firstCtrl").value;
      let newPassword = this.secondFormGroup.get("secondCtrl").value;
      let confirmPassword = this.secondFormGroup.get("thirdCtrl").value;
      if (newPassword === confirmPassword) {
        this.changePasswordStatus = '';
        this.appComponent.startSpinner("Processing your request.\xa0\xa0Please wait ...");
        this.passwordService.changePassword(currentPassword, newPassword).subscribe((data: any) => {
          if (data.success) {
            this.color = "green";
            this.changePasswordStatus = data.message;
            setTimeout(() => { this.appComponent.stopSpinner(); }, 1000);
          } else {
            this.changePasswordStatus = data.message;
            setTimeout(() => { this.appComponent.stopSpinner(); }, 1000);
          }
        }, (error) => {
          this.changePasswordStatus = "Error! - Something Went Wrong! Try again.";
          setTimeout(() => { this.appComponent.stopSpinner(); }, 1000);
        });
      } else {
        this.changePasswordStatus = " New passwords should match with confirm password";
      }
    }
  }
}

