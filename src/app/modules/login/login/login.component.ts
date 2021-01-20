import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { PasswordService } from 'src/app/service/password/password.service';
import { NgxSpinnerService } from 'ngx-spinner';

//for popup forgotpassword
export interface DialogData {
  email: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  logInflag:boolean=false; 
  hide = true;
  username: string = "";
  password: string = "";
  email: any; //for forgot password
  isLoggedIn = false;
  // loginForm
  error: string;
  usernameError: string;
  passwordError: string;

  // for side in login page
  companyEmail = "admin@mbs.com";
  companyNumber = "9090909090";
  companyAddress = "6th cross opposite regus, kr road, bangalore 562343";

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private appComponent: AppComponent,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    if (this.isLoggedIn) {
      this.router.navigateByUrl("home");
    }
  }

  // used to validate user name
  validateUsername() {
    if (this.username == "" || this.username == null) {
      this.usernameError = "Username Required *";
    } else {
      this.usernameError = "";
      this.error = "";
    }
  }

  // used to validate password
  validatePassword() {
    if (this.password == "" || this.password == null) {
      this.passwordError = "Password Required *";
    } else {
      this.passwordError = "";
      this.error = "";
    }
  }

  doLogin() {
    if (
      this.username !== "" &&
      this.username !== null &&
      this.password !== "" &&
      this.password !== null
    ) {
      this.appComponent.startSpinner("Authenticating ...");
      this.authenticationService
        .authenticate(this.username, this.password)
        .subscribe(
          (resp: boolean) => {
            if (resp) {
              this.logInflag=true;
              this.appComponent.startSpinner(
                "Loading data..\xa0\xa0Please wait ..."
              );
              this.router.navigate(["/home"]);
              setTimeout(() => {
                this.appComponent.stopSpinner();
              }, 2000); // 2 seconds.
            } else {
              this.error = "Bad Credentials.";
              setTimeout(() => {
                this.appComponent.stopSpinner();
              }, 1000); // 1 seconds.
            }
          },
          (error) => {
            console.log(error);
            this.error = "Invalid Credentials.";
            setTimeout(() => {
              this.appComponent.stopSpinner();
            }, 1000); // 1 seconds.
          }
        );
    } else {
      this.validateUsername();
      this.validatePassword();
    }
  }

  //for popup forgotpassword
  openDialog(): void {
    const dialogRef = this.dialog.open(ForgotPaswordDialog, {
      width: "400px",
      data: { email: this.email }
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}

//PopUp of forgot password
@Component({
  selector: "forgotpassworddialog",
  templateUrl: "forgotpassworddialog.html",
  styleUrls: ["./login.component.scss"],
})
export class ForgotPaswordDialog {
  constructor(
    public dialogRef: MatDialogRef<ForgotPaswordDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private passwordService: PasswordService,
    private spinner: NgxSpinnerService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  //email validation for forgot password
  emailError: string;
  emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z]+.[a-zA-Z]{2,4}$/;
  validateEmail(): boolean {
    if (this.data.email != "" && !isNullOrUndefined(this.data.email)) {
      if (this.data.email.match(this.emailPattern)) {
        this.emailError = "";
        return true;
      } else {
        this.emailError = "Please Enter Valid EmailId";
      }
    }
    // else {
    //   this.emailError = "Email Id Required *";
    // }
    return false;
  }

  //submit for forgot password
  onSubmit() {
    if (this.validateEmail()) {
      this.spinner.show("fgtPwdSpinner");
      this.passwordService.forgotPassword(this.data.email).subscribe(
        (data: any) => {
          if (data.success) {
            setTimeout(() => {
              alert(data.message);
              this.spinner.hide("fgtPwdSpinner");
              this.dialogRef.close();
            }, 1000);
          } else {
            setTimeout(() => {
              alert(data.message);
              this.spinner.hide("fgtPwdSpinner");
            }, 1000);
          }
        },
        (error) => {
          setTimeout(() => {
            alert("Error! - Something Went Wrong! Try again.");
            this.spinner.hide("fgtPwdSpinner");
          }, 1000);
        }
      );
    }
  }

  close() {
    this.dialogRef.close();
  }
}

